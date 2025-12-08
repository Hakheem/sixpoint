import mongoose, { Schema, Document } from "mongoose";

export interface IVisitPlace extends Document {
  title: string;
  description?: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const visitPlaceSchema = new Schema<IVisitPlace>(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const VisitPlace = mongoose.model<IVisitPlace>(
  "VisitPlace",
  visitPlaceSchema
);
