import { Request, Response } from "express";
import { auth } from "../lib/auth";
import crypto from "crypto";
import { emailService } from "../lib/email";
import * as bcrypt from "bcryptjs";
import { User } from "../models/user";
import { Verification } from "../models/verification";
import { Account } from "../models/account";

export const authController = {
  // Get current user
  getCurrentUser: async (req: Request, res: Response) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers as any,
      });

      if (!session) {
        return res.status(401).json({
          success: false,
          error: "Not authenticated",
        });
      }

      const user = await User.findById(session.user.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }

      res.json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          role: user.role,
          isActive: user.isActive,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      console.error("Get current user error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },

  // Request password reset
  requestPasswordReset: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          error: "Email is required",
        });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.json({
          success: true,
          message:
            "If an account with that email exists, a password reset link has been sent.",
        });
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

      // Store verification token
      const verification = new Verification({
        identifier: email,
        token: resetToken,
        expiresAt: resetTokenExpiry,
      });
      await verification.save();

      // Send email with reset link
      await emailService.sendPasswordReset(
        email,
        user.name || user.email,
        resetToken
      );

      res.json({
        success: true,
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    } catch (error) {
      console.error("Request password reset error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },

  // Reset password with token
  resetPassword: async (req: Request, res: Response) => {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({
          success: false,
          error: "Token and new password are required",
        });
      }

      if (newPassword.length < 8) {
        return res.status(400).json({
          success: false,
          error: "Password must be at least 8 characters",
        });
      }

      // Find valid verification token
      const verification = await Verification.findOne({
        token,
        expiresAt: { $gte: new Date() },
      });

      if (!verification) {
        return res.status(400).json({
          success: false,
          error: "Invalid or expired reset token",
        });
      }

      const user = await User.findOne({ email: verification.identifier });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }

      // Update password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.findByIdAndUpdate(user._id, { password: hashedPassword });

      // Delete the verification token
      await Verification.deleteOne({ _id: verification._id });

      res.json({
        success: true,
        message: "Password reset successfully",
      });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },

  // Verify email
  verifyEmail: async (req: Request, res: Response) => {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({
          success: false,
          error: "Verification token is required",
        });
      }

      const verification = await Verification.findOne({
        token,
        expiresAt: { $gte: new Date() },
      });

      if (!verification) {
        return res.status(400).json({
          success: false,
          error: "Invalid or expired verification token",
        });
      }

      const user = await User.findOne({ email: verification.identifier });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }

      // Mark email as verified
      await User.findByIdAndUpdate(user._id, { emailVerified: true });

      // Delete the verification token
      await Verification.deleteOne({ _id: verification._id });

      res.json({
        success: true,
        message: "Email verified successfully",
      });
    } catch (error) {
      console.error("Verify email error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },

  // Sign out
  signOut: async (req: Request, res: Response) => {
    try {
      res.json({
        success: true,
        message: "Sign out successful",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },
};
