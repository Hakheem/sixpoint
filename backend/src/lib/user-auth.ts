import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const userAuth = betterAuth({
  database: prismaAdapter(prisma, { provider: "mongodb" }),
  emailAndPassword: {
    enabled: true,
    rememberMe: true, // <---- remember me support
    sendResetPassword: async ({ user, url, token }) => {
      // implement your email sender here
      console.log(`Send reset password email to ${user.email}: ${url}`);
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
