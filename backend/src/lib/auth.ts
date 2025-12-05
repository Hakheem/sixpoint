// src/lib/auth.ts
import { betterAuth } from 'better-auth';
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import fs from 'fs';

// Load .env file
dotenv.config({ path: '.env' });

console.log('🔄 Initializing Prisma Client...');
console.log('Current directory:', process.cwd());
console.log('.env file exists:', fs.existsSync('.env'));
console.log('DATABASE_URL:', process.env.DATABASE_URL || 'NOT SET');
console.log('BETTER_AUTH_SECRET:', process.env.BETTER_AUTH_SECRET ? '✅ Set' : '❌ Not set');

// Initialize Prisma - REMOVE THE ADAPTER PROPERTY
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

console.log('✅ Prisma Client created');

// Simple connection test
prisma.$connect()
  .then(() => {
    console.log('✅ Prisma connected to database');
  })
  .catch((error) => {
    console.error('❌ Prisma connection error:', error.message);
    console.log('💡 Make sure MongoDB is running. Open a new terminal and run: mongod');
  });

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  
  secret: process.env.BETTER_AUTH_SECRET || "dev-secret-change-in-production",
  trustedOrigins: [process.env.FRONTEND_URL || 'http://localhost:3000'],
  siteUrl: process.env.BACKEND_URL || 'http://localhost:8080',
  
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }
  },
  
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "GUEST",
        required: true,
      },
      phone: {
        type: "string",
        required: false,
      },
      isActive: {
        type: "boolean",
        defaultValue: true,
        required: true,
      }
    }
  },
  
  email: {
    from: process.env.EMAIL_FROM || 'noreply@sixpointvictoria.com',
    server: {
      host: "localhost",
      port: 587,
      auth: {
        user: "",
        pass: ""
      }
    },
    sendResetPassword: async ({ user, url }: { user: any; url: string }) => {
      console.log(`📧 Reset password URL for ${user.email}: ${url}`);
      return { success: true };
    },
    sendVerification: async () => {
      return { success: true };
    }
  }
});

console.log('✅ Better Auth configured successfully');

export { prisma };
