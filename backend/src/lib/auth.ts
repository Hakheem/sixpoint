import { betterAuth } from "better-auth";
import mongoose from "mongoose";
import { User } from "../models/user";
import { Session } from "../models/session";
import { Account } from "../models/account";
import { Verification } from "../models/verification";

console.log("🔄 Initializing MongoDB Connection...");
console.log(
  "DATABASE_URL:",
  process.env.DATABASE_URL ? "✅ Set" : "❌ NOT SET"
);
console.log(
  "BETTER_AUTH_SECRET:",
  process.env.BETTER_AUTH_SECRET ? "✅ Set" : "❌ Not set"
);

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set in .env");
    }

    await mongoose.connect(process.env.DATABASE_URL);
    console.log("✅ MongoDB connected successfully");
  } catch (error: any) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

connectDB();

// MongoDB adapter for better-auth
const mongooseAdapter = {
  id: "mongoose-adapter",
  
  async create(data: { model: string; data: any }) {
    const { model, data: record } = data;
    
    switch (model) {
      case "user":
        const user = new User(record);
        return (await user.save()).toObject();
      case "session":
        const session = new Session(record);
        return (await session.save()).toObject();
      case "account":
        const account = new Account(record);
        return (await account.save()).toObject();
      case "verification":
        const verification = new Verification(record);
        return (await verification.save()).toObject();
      default:
        throw new Error(`Unknown model: ${model}`);
    }
  },

  async findOne(data: { model: string; where: any }) {
    const { model, where } = data;
    
    switch (model) {
      case "user":
        return User.findOne(where);
      case "session":
        return Session.findOne(where).populate("userId");
      case "account":
        return Account.findOne(where);
      case "verification":
        return Verification.findOne(where);
      default:
        throw new Error(`Unknown model: ${model}`);
    }
  },

  async findMany(data: { model: string; where?: any; limit?: number }) {
    const { model, where = {}, limit } = data;
    
    switch (model) {
      case "user":
        const userQuery = User.find(where);
        return limit ? userQuery.limit(limit) : userQuery;
      case "session":
        const sessionQuery = Session.find(where);
        return limit ? sessionQuery.limit(limit) : sessionQuery;
      case "account":
        const accountQuery = Account.find(where);
        return limit ? accountQuery.limit(limit) : accountQuery;
      case "verification":
        const verificationQuery = Verification.find(where);
        return limit ? verificationQuery.limit(limit) : verificationQuery;
      default:
        throw new Error(`Unknown model: ${model}`);
    }
  },

  async update(data: { model: string; where: any; update: any }) {
    const { model, where, update } = data;
    
    switch (model) {
      case "user":
        return User.findOneAndUpdate(where, update, { new: true });
      case "session":
        return Session.findOneAndUpdate(where, update, { new: true });
      case "account":
        return Account.findOneAndUpdate(where, update, { new: true });
      case "verification":
        return Verification.findOneAndUpdate(where, update, { new: true });
      default:
        throw new Error(`Unknown model: ${model}`);
    }
  },

  async delete(data: { model: string; where: any }) {
    const { model, where } = data;
    
    switch (model) {
      case "user":
        return User.findOneAndDelete(where);
      case "session":
        return Session.findOneAndDelete(where);
      case "account":
        return Account.findOneAndDelete(where);
      case "verification":
        return Verification.findOneAndDelete(where);
      default:
        throw new Error(`Unknown model: ${model}`);
    }
  },
};

export const auth = betterAuth({
  database: mongooseAdapter as any,

  secret: process.env.BETTER_AUTH_SECRET || "dev-secret-change-in-production",
  trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:3000"],
  baseURL: process.env.BACKEND_URL || "http://localhost:8080",

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});

console.log("✅ Better Auth configured successfully");

export { mongoose };

