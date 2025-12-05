// src/routes/auth-routes.ts
import { Router } from 'express';
import { auth } from '../lib/auth';
import { authController } from '../controllers/auth-controller';

const authRouter = Router();

// Better Auth API routes 
authRouter.all('/*', (req, res) => {
  // Just pass req and res directly to auth.handler
  return (auth.handler as any)(req, res);
});

// Custom auth routes
authRouter.get('/me', authController.getCurrentUser);
authRouter.post('/request-reset', authController.requestPasswordReset);
authRouter.post('/reset-password', authController.resetPassword);
authRouter.post('/verify-email', authController.verifyEmail);
authRouter.post('/sign-out', authController.signOut);

export default authRouter;

