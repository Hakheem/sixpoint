import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export interface AuthRequest extends Request {
  currentUser?: any;
}

// Middleware to check authentication
export const isAuthenticated = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.session;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: string; type: "USER" | "ADMIN" };

    if (payload.type === "USER") {
      const user = await prisma.user.findUnique({ where: { id: payload.id } });
      if (!user) return res.status(401).json({ message: "User not found" });

      // SUPERADMIN 
      req.currentUser = {
        ...user,
        role: user.role, 
        type: "USER",
      };
    } else {
      const admin = await prisma.admin.findUnique({ where: { id: payload.id } });
      if (!admin) return res.status(401).json({ message: "Admin not found" });
      if (!admin.approved) return res.status(403).json({ message: "Admin not approved yet" });

      req.currentUser = {
        ...admin,
        role: "ADMIN",
        type: "ADMIN",
      };
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Only SUPERADMIN
export const isSuperAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  const currentUser = req.currentUser;
  if (!currentUser || currentUser.role !== "SUPERADMIN") {
    return res.status(403).json({ message: "SUPERADMIN access required" });
  }
  next();
};

// ADMIN or SUPERADMIN
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  const currentUser = req.currentUser;
  if (!currentUser || (currentUser.role !== "ADMIN" && currentUser.role !== "SUPERADMIN")) {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

