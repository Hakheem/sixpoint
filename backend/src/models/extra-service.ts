import mongoose, { Schema, Document } from "mongoose";

export interface IExtraService extends Document {
  title: string;
  description?: string;
  imageUrl?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const extraServiceSchema = new Schema<IExtraService>(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    imageUrl: String,
    price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const ExtraService = mongoose.model<IExtraService>(
  "ExtraService",
  extraServiceSchema
);
