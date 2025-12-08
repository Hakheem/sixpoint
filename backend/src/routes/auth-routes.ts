// src/routes/auth-routes.ts
import { Router } from 'express';
import { auth } from '../lib/auth';
import { authController } from '../controllers/auth-controller';

const authRouter = Router();

// Custom auth routes (must come BEFORE the catch-all)
authRouter.get('/me', authController.getCurrentUser);
authRouter.post('/request-reset', authController.requestPasswordReset);
authRouter.post('/reset-password', authController.resetPassword);
authRouter.post('/verify-email', authController.verifyEmail);
authRouter.post('/sign-out', authController.signOut);

// Better Auth API routes - catch-all (must be LAST)
authRouter.use((req, res) => {
  return (auth.handler as any)(req, res);
});

export default authRouter;