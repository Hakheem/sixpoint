import mongoose, { Schema, Document } from "mongoose";

export interface IAccount extends Document {
  userId: string;
  provider: string;
  providerAccountId: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
  createdAt: Date;
  updatedAt: Date;
}

const accountSchema = new Schema<IAccount>(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    provider: {
      type: String,
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
    },
    accessToken: String,
    refreshToken: String,
    expiresAt: Number,
  },
  { timestamps: true }
);

accountSchema.index({ userId: 1, provider: 1 }, { unique: true });

export const Account = mongoose.model<IAccount>("Account", accountSchema);
