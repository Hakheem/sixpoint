import mongoose, { Schema, Document } from "mongoose";

export interface IVerification extends Document {
  identifier: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

const verificationSchema = new Schema<IVerification>(
  {
    identifier: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Auto-delete expired verifications
verificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Verification = mongoose.model<IVerification>(
  "Verification",
  verificationSchema
);
