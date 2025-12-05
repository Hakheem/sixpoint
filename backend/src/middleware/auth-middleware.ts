// src/middleware/auth-middleware.ts
import { Request, Response, NextFunction } from 'express';
import { auth, prisma } from '../lib/auth';

// Simple auth middleware - just checks if user is logged in
export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers as any,
    });
    
    if (!session) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    if (!user.isActive) {
      return res.status(403).json({ error: 'Account is inactive' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Check if user has admin role
export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  await requireAuth(req, res, () => {
    if (req.user?.role !== 'ADMIN' && req.user?.role !== 'SUPERADMIN') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  });
};

// Check if user is superadmin
export const requireSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
  await requireAuth(req, res, () => {
    if (req.user?.role !== 'SUPERADMIN') {
      return res.status(403).json({ error: 'SuperAdmin access required' });
    }
    next();
  });
};

