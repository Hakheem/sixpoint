// src/routes/user-routes.ts
import { Router } from 'express';
import { requireAuth } from '../middleware/auth-middleware';
import { userController } from '../controllers/user-controller';

const userRouter = Router();

// All routes require authentication
userRouter.use(requireAuth);

// Profile
userRouter.get('/profile', userController.getProfile);
userRouter.put('/profile', userController.updateProfile);

// Bookings
userRouter.get('/bookings', userController.getBookings);
userRouter.get('/bookings/:id', userController.getBooking);
userRouter.patch('/bookings/:id/cancel', userController.cancelBooking);

// Reviews
userRouter.get('/reviews', userController.getReviews);
userRouter.post('/reviews', userController.createReview);

export default userRouter;
