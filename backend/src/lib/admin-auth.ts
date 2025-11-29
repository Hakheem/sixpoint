import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const adminAuth = betterAuth({
  database: prismaAdapter(prisma, { provider: "mongodb" }),
  emailAndPassword: {
    enabled: true,
    rememberMe: true,
    sendResetPassword: async ({ user, url, token }) => {
      console.log(`Send admin reset password email to ${user.email}: ${url}`);
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
