// src/controllers/admin-controller.ts
import { Request, Response } from 'express';
import { prisma } from '../lib/auth';

export const adminController = {
  // Get all users (SuperAdmin only)
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 20, role, search } = req.query;
      const skip = (Number(page) - 1) * Number(limit);
      
      const where: any = {};
      
      if (role && ['GUEST', 'ADMIN', 'SUPERADMIN'].includes(role as string)) {
        where.role = role;
      }
      
      if (search) {
        where.OR = [
          { email: { contains: search as string, mode: 'insensitive' } },
          { name: { contains: search as string, mode: 'insensitive' } }
        ];
      }
      
      const users = await prisma.user.findMany({
        where,
        skip,
        take: Number(limit),
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          phone: true,
          emailVerified: true,
          createdAt: true,
          _count: {
            select: {
              bookings: true,
              reviews: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
      
      const total = await prisma.user.count({ where });
      
      res.json({
        success: true,
        data: users,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      });
    } catch (error) {
      console.error('Get all users error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
      });
    }
  },
  
  // Update user role
  updateUserRole: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { role } = req.body;
      
      if (!['GUEST', 'ADMIN', 'SUPERADMIN'].includes(role)) {
        return res.status(400).json({ 
          success: false,
          error: 'Invalid role' 
        });
      }
      
      // Check if trying to change own superadmin role
      if (id === req.user?.id && req.user?.role === 'SUPERADMIN' && role !== 'SUPERADMIN') {
        return res.status(400).json({ 
          success: false,
          error: 'Cannot change your own superadmin role' 
        });
      }
      
      const user = await prisma.user.update({
        where: { id },
        data: { role }
      });
      
      res.json({ 
        success: true,
        message: 'User role updated successfully',
        data: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Update user role error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
      });
    }
  },
  
  // Toggle user active status
  toggleUserStatus: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      // Don't allow disabling own account
      if (id === req.user?.id) {
        return res.status(400).json({ 
          success: false,
          error: 'Cannot disable your own account' 
        });
      }
      
      const user = await prisma.user.findUnique({
        where: { id },
        select: { isActive: true }
      });
      
      if (!user) {
        return res.status(404).json({ 
          success: false,
          error: 'User not found' 
        });
      }
      
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { isActive: !user.isActive }
      });
      
      res.json({ 
        success: true,
        message: `User ${updatedUser.isActive ? 'activated' : 'deactivated'} successfully`,
        data: {
          id: updatedUser.id,
          email: updatedUser.email,
          isActive: updatedUser.isActive
        }
      });
    } catch (error) {
      console.error('Toggle user status error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
      });
    }
  },
  
  // Get dashboard stats (Admin & SuperAdmin)
  getDashboardStats: async (req: Request, res: Response) => {
    try {
      const [
        totalUsers,
        totalBookings,
        totalRooms,
        totalRevenue,
        recentBookings,
        recentUsers
      ] = await Promise.all([
        prisma.user.count(),
        prisma.booking.count(),
        prisma.room.count(),
        prisma.booking.aggregate({
          _sum: { totalAmount: true },
          where: { status: { in: ['CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT'] } }
        }),
        prisma.booking.findMany({
          take: 10,
          include: {
            user: {
              select: { name: true, email: true }
            },
            rooms: {
              include: {
                room: {
                  select: { title: true }
                }
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }),
        prisma.user.findMany({
          take: 10,
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' }
        })
      ]);
      
      res.json({
        success: true,
        data: {
          stats: {
            totalUsers,
            totalBookings,
            totalRooms,
            totalRevenue: totalRevenue._sum.totalAmount || 0
          },
          recentBookings,
          recentUsers
        }
      });
    } catch (error) {
      console.error('Get dashboard stats error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
      });
    }
  },

  // Delete user (SuperAdmin only)
  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      // Don't allow deleting own account
      if (id === req.user?.id) {
        return res.status(400).json({ 
          success: false,
          error: 'Cannot delete your own account' 
        });
      }
      
      await prisma.user.delete({
        where: { id }
      });
      
      res.json({ 
        success: true,
        message: 'User deleted successfully' 
      });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
      });
    }
  }
};
