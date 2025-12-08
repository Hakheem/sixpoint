// src/controllers/admin-controller.ts
import { Request, Response } from "express";
import { User } from "../models/user";

export const adminController = {
  // Get all users (SuperAdmin only)
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 20, role, search } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      const filter: any = {};

      if (role) {
        filter.role = role;
      }

      if (search) {
        filter.$or = [
          { email: { $regex: search, $options: "i" } },
          { name: { $regex: search, $options: "i" } },
        ];
      }

      const users = await User.find(filter)
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 });

      const total = await User.countDocuments(filter);

      res.json({
        success: true,
        data: users,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      console.error("Get all users error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },

  // Update user role
  updateUserRole: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { role } = req.body;

      if (!role || !["GUEST", "ADMIN", "SUPERADMIN"].includes(role)) {
        return res.status(400).json({
          success: false,
          error: "Invalid role",
        });
      }

      const user = await User.findByIdAndUpdate(
        userId,
        { role },
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
        message: "User role updated successfully",
        data: user,
      });
    } catch (error) {
      console.error("Update user role error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },

  // Toggle user active status
  toggleUserStatus: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { isActive: !user.isActive },
        { new: true }
      );

      res.json({
        success: true,
        message: "User status updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.error("Toggle user status error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },

  // Delete user
  deleteUser: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      await User.findByIdAndDelete(userId);

      res.json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },

  // Get dashboard stats (placeholder)
  getDashboardStats: async (req: Request, res: Response) => {
    try {
      const totalUsers = await User.countDocuments();

      res.json({
        success: true,
        data: {
          totalUsers,
          totalBookings: 0,
          totalRooms: 0,
          totalRevenue: 0,
          recentBookings: [],
          recentUsers: [],
        },
      });
    } catch (error) {
      console.error("Get dashboard stats error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },
};
