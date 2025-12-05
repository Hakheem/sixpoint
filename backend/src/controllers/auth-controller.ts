// src/controllers/auth-controller.ts
import { Request, Response } from 'express';
import { auth, prisma } from '../lib/auth';
import crypto from 'crypto';
import { emailService } from '../lib/email';
import * as bcrypt from 'bcryptjs';

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
          error: 'Not authenticated' 
        });
      }
      
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          role: true,
          image: true,
          isActive: true,
          emailVerified: true,
          createdAt: true
        }
      });
      
      if (!user) {
        return res.status(404).json({ 
          success: false,
          error: 'User not found' 
        });
      }
      
      res.json({ 
        success: true,
        user 
      });
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
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
          error: 'Email is required' 
        });
      }
      
      const user = await prisma.user.findUnique({
        where: { email }
      });
      
      if (!user) {
        // Don't reveal if user exists or not
        return res.json({ 
          success: true,
          message: 'If an account with that email exists, a password reset link has been sent.' 
        });
      }
      
      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
      
      // Store verification token
      await prisma.verification.create({
        data: {
          identifier: email,
          value: resetToken,
          expiresAt: resetTokenExpiry,
          userId: user.id
        }
      });
      
      // Send email with reset link
      const emailSent = await emailService.sendPasswordReset(
        email, 
        user.name || user.email, 
        resetToken
      );
      
      if (!emailSent) {
        console.error('Failed to send password reset email');
        // Still return success to user, but log the error
      }
      
      res.json({ 
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.',
        // Only include token in development
        ...(process.env.NODE_ENV === 'development' && { token: resetToken })
      });
    } catch (error) {
      console.error('Request password reset error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
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
          error: 'Token and new password are required' 
        });
      }
      
      if (newPassword.length < 8) {
        return res.status(400).json({ 
          success: false,
          error: 'Password must be at least 8 characters' 
        });
      }
      
      // Find valid verification token
      const verification = await prisma.verification.findFirst({
        where: {
          value: token,
          expiresAt: { gte: new Date() }
        },
        include: {
          user: true
        }
      });
      
      if (!verification || !verification.user) {
        return res.status(400).json({ 
          success: false,
          error: 'Invalid or expired reset token' 
        });
      }
      
      // Update password using Better Auth
      const account = await prisma.account.findFirst({
        where: {
          userId: verification.user.id,
          providerId: 'credential'
        }
      });
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      if (account) {
        // Update existing account
        await prisma.account.update({
          where: { id: account.id },
          data: { 
            password: hashedPassword,
            updatedAt: new Date()
          }
        });
      } else {
        // Create new credential account - USE THE CORRECT FIELD NAMES
        await prisma.account.create({
          data: {
            userId: verification.user.id,
            providerId: 'credential',
            accountId: verification.user.email, // Use 'accountId' NOT 'providerAccountId'
            password: hashedPassword
          }
        });
      }
      
      // Delete the verification token
      await prisma.verification.delete({
        where: { id: verification.id }
      });
      
      res.json({ 
        success: true,
        message: 'Password reset successfully' 
      });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
      });
    }
  },

  // Verify email (optional - if you want to keep it for other purposes)
  verifyEmail: async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      
      if (!token) {
        return res.status(400).json({ 
          success: false,
          error: 'Verification token is required' 
        });
      }
      
      const verification = await prisma.verification.findFirst({
        where: {
          value: token,
          expiresAt: { gte: new Date() }
        },
        include: {
          user: true
        }
      });
      
      if (!verification || !verification.user) {
        return res.status(400).json({ 
          success: false,
          error: 'Invalid or expired verification token' 
        });
      }
      
      // Mark email as verified
      await prisma.user.update({
        where: { id: verification.user.id },
        data: { emailVerified: true }
      });
      
      // Delete the verification token
      await prisma.verification.delete({
        where: { id: verification.id }
      });
      
      res.json({ 
        success: true,
        message: 'Email verified successfully' 
      });
    } catch (error) {
      console.error('Verify email error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
      });
    }
  },

  // Sign out
  signOut: async (req: Request, res: Response) => {
    try {
      // Better Auth handles sign out through its API
      // This endpoint just confirms the action
      res.json({ 
        success: true,
        message: 'Sign out successful' 
      });
    } catch (error) {
      console.error('Sign out error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
      });
    }
  }
};

