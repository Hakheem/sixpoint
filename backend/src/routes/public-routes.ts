// src/routes/public-routes.ts
import { Router } from 'express';
import { Room } from '../models/room';
import { RoomType } from '../models/room-type';
import { Amenity } from '../models/amenity';
import { ExtraService } from '../models/extra-service';
import { SiteConfig } from '../models/site-config';
import { VisitPlace } from '../models/visit-place';
import { Booking } from '../models/booking';
import { Review } from '../models/review';

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
    
    const filter: any = {};

    // Price filter
    if (minPrice || maxPrice) {
      filter.pricePerNight = {};
      if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
    }
    
    // Capacity filter
    if (capacity) {
      filter.capacity = { $gte: Number(capacity) };
    }
    
    // Room type filter
    if (typeId) {
      filter.typeId = typeId;
    }
    
    // Get rooms
    const rooms = await Room.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .populate('typeId', 'name description')
      .populate('amenities')
      .populate('images')
      .sort({ [sortBy as string]: sortOrder === 'desc' ? -1 : 1 });
    
    const total = await Room.countDocuments(filter);
    
    // Calculate average ratings for each room
    const roomsWithRatings = await Promise.all(
      rooms.map(async (room: any) => {
        const reviews = await Review.find({ 
          roomId: room._id, 
          hidden: false 
        }).select('rating');
        
        const avgRating = reviews.length > 0 
          ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviews.length
          : null;
        
        return {
          ...room.toObject(),
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
    
    const room = await Room.findById(id)
      .populate('typeId', 'name description')
      .populate('amenities')
      .populate('extraServices')
      .populate('images');
    
    if (!room) {
      return res.status(404).json({ 
        success: false,
        error: 'Room not found' 
      });
    }
    
    // Get reviews for this room
    const reviews = await Review.find({ 
      roomId: id, 
      hidden: false 
    })
      .populate('userId', 'name image')
      .sort({ createdAt: -1 })
      .limit(10);
    
    // Calculate average rating
    const allReviews = await Review.find({ roomId: id, hidden: false });
    const avgRating = allReviews.length > 0
      ? allReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / allReviews.length
      : null;
    
    // Get similar rooms (same type)
    const similarRooms = await Room.find({
      typeId: (room as any).typeId,
      _id: { $ne: id }
    })
      .limit(4)
      .populate('images');
    
    res.json({
      success: true,
      data: {
        ...room.toObject(),
        reviews,
        avgRating,
        totalReviews: allReviews.length,
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

// Get room availability
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
    const overlappingBookings = await Booking.find({
      'rooms.roomId': id,
      $or: [
        {
          checkIn: {
            $gte: checkInDate,
            $lt: checkOutDate
          }
        },
        {
          checkOut: {
            $gt: checkInDate,
            $lte: checkOutDate
          }
        },
        {
          checkIn: { $lte: checkInDate },
          checkOut: { $gte: checkOutDate }
        }
      ],
      status: { $in: ['CONFIRMED', 'CHECKED_IN'] }
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
    const roomTypes = await RoomType.find();
    
    // Count rooms for each type
    const typesWithCount = await Promise.all(
      roomTypes.map(async (type: any) => {
        const count = await Room.countDocuments({ typeId: type._id });
        return {
          ...type.toObject(),
          roomCount: count
        };
      })
    );
    
    res.json({
      success: true,
      data: typesWithCount
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
    const amenities = await Amenity.find().sort({ name: 1 });
    
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
    const extraServices = await ExtraService.find().sort({ title: 1 });
    
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
    const config = await SiteConfig.findOne().sort({ createdAt: -1 });
    
    const defaultConfig = {
      logoUrl: null,
      heroImageUrl: null,
      heroMainHeading: 'Welcome to Sixpoint Victoria',
      heroHighlightedText: 'Luxury & Comfort',
      heroDescription: 'Experience unparalleled hospitality and world-class amenities',
      phone1: '+254712345678',
      phone2: '+254787654321',
      location: 'Kisumu, Kenya',
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
        heroMainHeading: 'Welcome to Sixpoint Victoria',
        heroHighlightedText: 'Luxury & Comfort',
        heroDescription: 'Experience unparalleled hospitality and world-class amenities',
        phone1: '+254712345678',
        phone2: '+254787654321',
        location: 'Kisumu, Kenya',
        facebook: null,
        instagram: null,
        tiktok: null,
        youtube: null,
        twitter: null
      }
    });
  }
});

// Get visit places
publicRouter.get('/visit-places', async (req, res) => {
  try {
    const places = await VisitPlace.find().sort({ createdAt: -1 });
    
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

// Calculate booking price
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
    
    if (checkInDate >= checkOutDate) {
      return res.status(400).json({ 
        success: false,
        error: 'Check-out date must be after check-in date' 
      });
    }
    
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (nights < 1) {
      return res.status(400).json({ 
        success: false,
        error: 'Minimum stay is 1 night' 
      });
    }
    
    // Get room prices
    const rooms = await Room.find({ _id: { $in: roomIds } }).select('_id title pricePerNight');
    
    if (rooms.length !== roomIds.length) {
      return res.status(400).json({ 
        success: false,
        error: 'One or more rooms not found' 
      });
    }
    
    // Calculate room total
    const roomTotal = rooms.reduce((sum: number, room: any) => sum + (room.pricePerNight * nights), 0);
    
    // Calculate extra services total
    let extraServicesTotal = 0;
    let selectedExtraServices: Array<{id: string; title: string; price: number}> = [];
    
    if (extraServices.length > 0) {
      const services = await ExtraService.find({ _id: { $in: extraServices } });
      extraServicesTotal = services.reduce((sum: number, service: any) => sum + service.price, 0);
      selectedExtraServices = services.map((s: any) => ({
        id: s._id.toString(),
        title: s.title,
        price: s.price
      }));
    }
    
    const taxRate = 0.16;
    const taxAmount = (roomTotal + extraServicesTotal) * taxRate;
    const subtotal = roomTotal + extraServicesTotal;
    const total = subtotal + taxAmount;
    
    res.json({
      success: true,
      data: {
        breakdown: {
          rooms: rooms.map((room: any) => ({
            id: room._id,
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

// Get featured rooms
publicRouter.get('/featured-rooms', async (req, res) => {
  try {
    const featuredRooms = await Room.find()
      .limit(6)
      .populate('typeId', 'name')
      .populate('images')
      .sort({ pricePerNight: -1 });
    
    const roomsWithRatings = await Promise.all(
      featuredRooms.map(async (room: any) => {
        const reviews = await Review.find({ 
          roomId: room._id, 
          hidden: false 
        }).select('rating');
        
        const avgRating = reviews.length > 0 
          ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviews.length
          : null;
        
        return {
          ...room.toObject(),
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

// Contact form
publicRouter.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message, subject } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false,
        error: 'Name, email, and message are required' 
      });
    }
    
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
