// src/controllers/user-controller.ts
import { Request, Response } from "express";
import { User } from "../models/user";

export const userController = {
  // Get user profile
  getProfile: async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.user?.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }

      res.json({
        success: true,
        data: {
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
      console.error("Get profile error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },

  // Update profile
  updateProfile: async (req: Request, res: Response) => {
    try {
      const { name, phone } = req.body;

      const user = await User.findByIdAndUpdate(
        req.user?.id,
        {
          ...(name && { name }),
          ...(phone && { phone }),
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }

      res.json({
        success: true,
        message: "Profile updated successfully",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      });
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },

  // Placeholder endpoints for bookings and reviews
  getBookings: async (req: Request, res: Response) => {
    res.json({
      success: true,
      message: "Bookings endpoint - implement with your Booking model",
      data: [],
    });
  },

  getBooking: async (req: Request, res: Response) => {
    res.json({
      success: true,
      message: "Get booking endpoint - implement with your Booking model",
    });
  },

  cancelBooking: async (req: Request, res: Response) => {
    res.json({
      success: true,
      message: "Cancel booking endpoint - implement with your Booking model",
    });
  },

  getReviews: async (req: Request, res: Response) => {
    res.json({
      success: true,
      message: "Reviews endpoint - implement with your Review model",
      data: [],
    });
  },

  createReview: async (req: Request, res: Response) => {
    res.json({
      success: true,
      message: "Create review endpoint - implement with your Review model",
    });
  },
};
