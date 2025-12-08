// src/routes/admin-routes.ts
import { Router } from 'express';
import { requireAdmin, requireSuperAdmin } from '../middleware/auth-middleware';
import { adminController } from '../controllers/admin-controller';

const adminRouter = Router();

// Dashboard stats (Admin & SuperAdmin)
adminRouter.get('/dashboard/stats', requireAdmin, adminController.getDashboardStats);
 
// User management (SuperAdmin only)
adminRouter.get('/users', requireSuperAdmin, adminController.getAllUsers);
adminRouter.put('/users/:id/role', requireSuperAdmin, adminController.updateUserRole);
adminRouter.patch('/users/:id/toggle-status', requireSuperAdmin, adminController.toggleUserStatus);
adminRouter.delete('/users/:id', requireSuperAdmin, adminController.deleteUser);

export default adminRouter;
