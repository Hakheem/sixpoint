// src/controllers/user-controller.ts
import { Request, Response } from 'express';
import { prisma } from '../lib/auth';

export const userController = {
  // Get user profile
  getProfile: async (req: Request, res: Response) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          role: true,
          image: true,
          isActive: true,
          emailVerified: true,
          createdAt: true,
          _count: {
            select: {
              bookings: true,
              reviews: true
            }
          }
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
        data: user 
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
      });
    }
  },

  // Update profile
  updateProfile: async (req: Request, res: Response) => {
    try {
      const { name, phone } = req.body;
      
      const user = await prisma.user.update({
        where: { id: req.user!.id },
        data: {
          name: name || undefined,
          phone: phone || undefined
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          image: true
        }
      });
      
      res.json({ 
        success: true,
        message: 'Profile updated successfully',
        data: user
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
      });
    }
  },

  // Get user bookings
  getBookings: async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 10, status } = req.query;
      const skip = (Number(page) - 1) * Number(limit);
      
      const where: any = {
        userId: req.user!.id
      };
      
      if (status) {
        where.status = status;
      }
      
      const bookings = await prisma.booking.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          rooms: {
            include: {
              room: {
                select: {
                  id: true,
                  title: true,
                  pricePerNight: true,
                  images: {
                    take: 1,
                    select: { url: true, alt: true }
                  }
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
      
      const total = await prisma.booking.count({ where });
      
      res.json({
        success: true,
        data: bookings,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      });
    } catch (error) {
      console.error('Get bookings error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
      });
    }
  },

  // Get single booking
  getBooking: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      const booking = await prisma.booking.findFirst({
        where: {
          id,
          userId: req.user!.id
        },
        include: {
          rooms: {
            include: {
              room: {
                include: {
                  images: {
                    take: 1
                  },
                  type: true
                }
              }
            }
          },
          review: true
        }
      });
      
      if (!booking) {
        return res.status(404).json({ 
          success: false,
          error: 'Booking not found' 
        });
      }
      
      res.json({ 
        success: true,
        data: booking 
      });
    } catch (error) {
      console.error('Get booking error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
      });
    }
  },

  // Cancel booking
  cancelBooking: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      const booking = await prisma.booking.findFirst({
        where: {
          id,
          userId: req.user!.id
        }
      });
      
      if (!booking) {
        return res.status(404).json({ 
          success: false,
          error: 'Booking not found' 
        });
      }
      
      if (booking.status === 'CANCELLED') {
        return res.status(400).json({ 
          success: false,
          error: 'Booking is already cancelled' 
        });
      }
      
      if (booking.status === 'CHECKED_IN' || booking.status === 'CHECKED_OUT') {
        return res.status(400).json({ 
          success: false,
          error: 'Cannot cancel completed booking' 
        });
      }
      
      const updatedBooking = await prisma.booking.update({
        where: { id },
        data: { status: 'CANCELLED' }
      });
      
      res.json({ 
        success: true,
        message: 'Booking cancelled successfully',
        data: updatedBooking
      });
    } catch (error) {
      console.error('Cancel booking error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
      });
    }
  },

  // Get user reviews
  getReviews: async (req: Request, res: Response) => {
    try {
      const reviews = await prisma.review.findMany({
        where: {
          userId: req.user!.id
        },
        include: {
          room: {
            select: {
              id: true,
              title: true,
              images: {
                take: 1,
                select: { url: true }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
      
      res.json({ 
        success: true,
        data: reviews 
      });
    } catch (error) {
      console.error('Get reviews error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
      });
    }
  },

  // Create review
  createReview: async (req: Request, res: Response) => {
    try {
      const { bookingId, roomId, rating, comment } = req.body;
      
      if (!bookingId || !roomId || !rating) {
        return res.status(400).json({ 
          success: false,
          error: 'Booking ID, room ID, and rating are required' 
        });
      }
      
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ 
          success: false,
          error: 'Rating must be between 1 and 5' 
        });
      }
      
      // Check if booking exists and belongs to user
      const booking = await prisma.booking.findFirst({
        where: {
          id: bookingId,
          userId: req.user!.id,
          status: 'CHECKED_OUT'
        }
      });
      
      if (!booking) {
        return res.status(404).json({ 
          success: false,
          error: 'Booking not found or not checked out' 
        });
      }
      
      // Check if review already exists
      const existingReview = await prisma.review.findUnique({
        where: { bookingId }
      });
      
      if (existingReview) {
        return res.status(400).json({ 
          success: false,
          error: 'Review already exists for this booking' 
        });
      }
      
      const review = await prisma.review.create({
        data: {
          userId: req.user!.id,
          roomId,
          bookingId,
          rating,
          comment: comment || undefined
        },
        include: {
          room: {
            select: {
              id: true,
              title: true
            }
          }
        }
      });
      
      res.status(201).json({ 
        success: true,
        message: 'Review created successfully',
        data: review
      });
    } catch (error) {
      console.error('Create review error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
      });
    }
  }
};

