// src/routes/public-routes.ts
import { Router } from 'express';
import { prisma } from '../lib/auth';

const publicRouter = Router();

// Get all rooms with filtering and pagination
publicRouter.get('/rooms', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      minPrice, 
      maxPrice, 
      capacity,
      typeId,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const where: any = {};

    // Price filter
    if (minPrice || maxPrice) {
      where.pricePerNight = {};
      if (minPrice) where.pricePerNight.gte = Number(minPrice);
      if (maxPrice) where.pricePerNight.lte = Number(maxPrice);
    }
    
    // Capacity filter
    if (capacity) {
      where.capacity = { gte: Number(capacity) };
    }
    
    // Room type filter
    if (typeId) {
      where.typeId = typeId;
    }
    
    // Get rooms with images
    const rooms = await prisma.room.findMany({
      where,
      skip,
      take: Number(limit),
      include: {
        type: {
          select: { name: true, description: true }
        },
        amenities: {
          include: {
            amenity: {
              select: { name: true, iconName: true }
            }
          }
        },
        images: {
          take: 3,
          select: { url: true, alt: true, orientation: true }
        },
        _count: {
          select: {
            reviews: true
          }
        }
      },
      orderBy: {
        [sortBy as string]: sortOrder
      }
    });
    
    const total = await prisma.room.count({ where });
    
    // Calculate average ratings for each room
    const roomsWithRatings = await Promise.all(
      rooms.map(async (room) => {
        const reviews = await prisma.review.findMany({
          where: { roomId: room.id, hidden: false },
          select: { rating: true }
        });
        
        const avgRating = reviews.length > 0 
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
          : null;
        
        return {
          ...room,
          avgRating,
          totalReviews: reviews.length
        };
      })
    );
    
    res.json({
      success: true,
      data: roomsWithRatings,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch rooms' 
    });
  }
});

// Get single room with full details
publicRouter.get('/rooms/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const room = await prisma.room.findUnique({
      where: { id },
      include: {
        type: {
          select: { name: true, description: true }
        },
        amenities: {
          include: {
            amenity: {
              select: { name: true, description: true, iconName: true }
            }
          }
        },
        extraServices: {
          include: {
            extraService: {
              select: { title: true, description: true, price: true, imageUrl: true }
            }
          }
        },
        images: {
          select: { url: true, alt: true, orientation: true }
        }
      }
    });
    
    if (!room) {
      return res.status(404).json({ 
        success: false,
        error: 'Room not found' 
      });
    }
    
    // Get reviews for this room
    const reviews = await prisma.review.findMany({
      where: { roomId: id, hidden: false },
      include: {
        user: {
          select: { name: true, image: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    });
    
    // Calculate average rating
    const reviewStats = await prisma.review.aggregate({
      where: { roomId: id, hidden: false },
      _avg: { rating: true },
      _count: { rating: true }
    });
    
    // Get similar rooms (same type)
    const similarRooms = await prisma.room.findMany({
      where: {
        typeId: room.typeId,
        id: { not: id }
      },
      take: 4,
      include: {
        images: {
          take: 1,
          select: { url: true }
        }
      }
    });
    
    res.json({
      success: true,
      data: {
        ...room,
        reviews,
        avgRating: reviewStats._avg.rating,
        totalReviews: reviewStats._count.rating,
        similarRooms
      }
    });
  } catch (error) {
    console.error('Get room error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch room details' 
    });
  }
});

// Get room availability (check dates)
publicRouter.get('/rooms/:id/availability', async (req, res) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut } = req.query;
    
    if (!checkIn || !checkOut) {
      return res.status(400).json({ 
        success: false,
        error: 'Check-in and check-out dates are required' 
      });
    }
    
    const checkInDate = new Date(checkIn as string);
    const checkOutDate = new Date(checkOut as string);
    
    // Check for overlapping bookings
    const overlappingBookings = await prisma.booking.findMany({
      where: {
        rooms: {
          some: {
            roomId: id
          }
        },
        OR: [
          // Existing booking starts during requested period
          {
            checkIn: {
              gte: checkInDate,
              lt: checkOutDate
            }
          },
          // Existing booking ends during requested period
          {
            checkOut: {
              gt: checkInDate,
              lte: checkOutDate
            }
          },
          // Requested period is within existing booking
          {
            checkIn: { lte: checkInDate },
            checkOut: { gte: checkOutDate }
          }
        ],
        status: {
          in: ['CONFIRMED', 'CHECKED_IN']
        }
      }
    });
    
    const isAvailable = overlappingBookings.length === 0;
    
    res.json({
      success: true,
      data: {
        isAvailable,
        message: isAvailable ? 'Room is available' : 'Room is not available for selected dates',
        conflictingBookings: overlappingBookings.length
      }
    });
  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to check availability' 
    });
  }
});

// Get all room types
publicRouter.get('/room-types', async (req, res) => {
  try {
    const roomTypes = await prisma.roomType.findMany({
      include: {
        _count: {
          select: { rooms: true }
        }
      }
    });
    
    res.json({
      success: true,
      data: roomTypes
    });
  } catch (error) {
    console.error('Get room types error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch room types' 
    });
  }
});

// Get all amenities
publicRouter.get('/amenities', async (req, res) => {
  try {
    const amenities = await prisma.amenity.findMany({
      orderBy: { name: 'asc' }
    });
    
    res.json({
      success: true,
      data: amenities
    });
  } catch (error) {
    console.error('Get amenities error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch amenities' 
    });
  }
});

// Get extra services
publicRouter.get('/extra-services', async (req, res) => {
  try {
    const extraServices = await prisma.extraService.findMany({
      orderBy: { title: 'asc' }
    });
    
    res.json({
      success: true,
      data: extraServices
    });
  } catch (error) {
    console.error('Get extra services error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch extra services' 
    });
  }
});

// Get site configuration
publicRouter.get('/site-config', async (req, res) => {
  try {
    const config = await prisma.siteConfig.findFirst({
      orderBy: { createdAt: 'desc' }
    });
    
    // Return default config if none exists
    const defaultConfig = {
      logoUrl: null,
      heroImageUrl: null,
      heroMainHeading: 'Welcome to SixPoint Hotel',
      heroHighlightedText: 'Luxury & Comfort',
      heroDescription: 'Experience unparalleled hospitality and world-class amenities',
      phone1: '+1234567890',
      phone2: '+0987654321',
      location: '123 Luxury Street, Nairobi, Kenya',
      facebook: null,
      instagram: null,
      tiktok: null,
      youtube: null,
      twitter: null
    };
    
    res.json({
      success: true,
      data: config || defaultConfig
    });
  } catch (error) {
    console.error('Get site config error:', error);
    res.status(500).json({ 
      success: false,
      data: {
        logoUrl: null,
        heroImageUrl: null,
        heroMainHeading: 'Welcome to SixPoint Hotel',
        heroHighlightedText: 'Luxury & Comfort',
        heroDescription: 'Experience unparalleled hospitality and world-class amenities',
        phone1: '+1234567890',
        phone2: '+0987654321',
        location: '123 Luxury Street, Nairobi, Kenya',
        facebook: null,
        instagram: null,
        tiktok: null,
        youtube: null,
        twitter: null
      }
    });
  }
});

// Get visit places (attractions nearby)
publicRouter.get('/visit-places', async (req, res) => {
  try {
    const places = await prisma.visitPlace.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({
      success: true,
      data: places
    });
  } catch (error) {
    console.error('Get visit places error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch visit places' 
    });
  }
});

// Calculate booking price (without creating booking)
publicRouter.post('/calculate-price', async (req, res) => {
  try {
    const { roomIds, checkIn, checkOut, extraServices = [] } = req.body;
    
    if (!roomIds || !Array.isArray(roomIds) || roomIds.length === 0) {
      return res.status(400).json({ 
        success: false,
        error: 'At least one room is required' 
      });
    }
    
    if (!checkIn || !checkOut) {
      return res.status(400).json({ 
        success: false,
        error: 'Check-in and check-out dates are required' 
      });
    }
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    // Validate dates
    if (checkInDate >= checkOutDate) {
      return res.status(400).json({ 
        success: false,
        error: 'Check-out date must be after check-in date' 
      });
    }
    
    // Calculate number of nights
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (nights < 1) {
      return res.status(400).json({ 
        success: false,
        error: 'Minimum stay is 1 night' 
      });
    }
    
    // Get room prices
    const rooms = await prisma.room.findMany({
      where: { id: { in: roomIds } },
      select: { id: true, title: true, pricePerNight: true }
    });
    
    if (rooms.length !== roomIds.length) {
      return res.status(400).json({ 
        success: false,
        error: 'One or more rooms not found' 
      });
    }
    
    // Calculate room total
    const roomTotal = rooms.reduce((sum, room) => sum + (room.pricePerNight * nights), 0);
    
    // Calculate extra services total
    let extraServicesTotal = 0;
    let selectedExtraServices: Array<{id: string; title: string; price: number}> = [];
    
    if (extraServices.length > 0) {
      const services = await prisma.extraService.findMany({
        where: { id: { in: extraServices } }
      });
      
      extraServicesTotal = services.reduce((sum, service) => sum + service.price, 0);
      selectedExtraServices = services.map(s => ({
        id: s.id,
        title: s.title,
        price: s.price
      }));
    }
    
    // Calculate taxes (example: 16% VAT)
    const taxRate = 0.16;
    const taxAmount = (roomTotal + extraServicesTotal) * taxRate;
    
    // Calculate total
    const subtotal = roomTotal + extraServicesTotal;
    const total = subtotal + taxAmount;
    
    res.json({
      success: true,
      data: {
        breakdown: {
          rooms: rooms.map(room => ({
            id: room.id,
            title: room.title,
            pricePerNight: room.pricePerNight,
            nights,
            total: room.pricePerNight * nights
          })),
          extraServices: selectedExtraServices
        },
        totals: {
          roomTotal,
          extraServicesTotal,
          subtotal,
          taxRate: `${taxRate * 100}%`,
          taxAmount,
          total
        },
        stayDetails: {
          checkIn: checkInDate.toISOString(),
          checkOut: checkOutDate.toISOString(),
          nights
        }
      }
    });
  } catch (error) {
    console.error('Calculate price error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to calculate price' 
    });
  }
});

// Get featured rooms (for homepage)
publicRouter.get('/featured-rooms', async (req, res) => {
  try {
    const featuredRooms = await prisma.room.findMany({
      take: 6,
      include: {
        type: {
          select: { name: true }
        },
        images: {
          take: 1,
          select: { url: true, alt: true }
        },
        _count: {
          select: {
            reviews: true
          }
        }
      },
      orderBy: { pricePerNight: 'desc' }
    });
    
    // Calculate ratings
    const roomsWithRatings = await Promise.all(
      featuredRooms.map(async (room) => {
        const reviews = await prisma.review.findMany({
          where: { roomId: room.id, hidden: false },
          select: { rating: true }
        });
        
        const avgRating = reviews.length > 0 
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
          : null;
        
        return {
          ...room,
          avgRating,
          totalReviews: reviews.length
        };
      })
    );
    
    res.json({
      success: true,
      data: roomsWithRatings
    });
  } catch (error) {
    console.error('Get featured rooms error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch featured rooms' 
    });
  }
});

// Contact form submission
publicRouter.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message, subject } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false,
        error: 'Name, email, and message are required' 
      });
    }
    
    // TODO: Save to database and send email
    console.log('Contact form submission:', { name, email, phone, message, subject });
    
    res.json({
      success: true,
      message: 'Thank you for contacting us. We will get back to you soon.',
      data: {
        name,
        email,
        subject: subject || 'General Inquiry',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to submit contact form' 
    });
  }
});

export default publicRouter;
