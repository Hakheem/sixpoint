import mongoose, { Schema, Document } from "mongoose";

export interface IAmenity extends Document {
  name: string;
  description?: string;
  iconName?: string;
  createdAt: Date;
}

const amenitySchema = new Schema<IAmenity>(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    iconName: String,
  },
  { timestamps: true }
);

export const Amenity = mongoose.model<IAmenity>("Amenity", amenitySchema);
