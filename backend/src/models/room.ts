import mongoose, { Schema, Document } from "mongoose";

export interface IRoom extends Document {
  title: string;
  description?: string;
  roomNumber?: string;
  capacity: number;
  pricePerNight: number;
  orientation: "PORTRAIT" | "LANDSCAPE";
  allowPrepaid: boolean;
  allowPayOnArrival: boolean;
  typeId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const roomSchema = new Schema<IRoom>(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    roomNumber: String,
    capacity: {
      type: Number,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    orientation: {
      type: String,
      enum: ["PORTRAIT", "LANDSCAPE"],
      default: "LANDSCAPE",
    },
    allowPrepaid: {
      type: Boolean,
      default: true,
    },
    allowPayOnArrival: {
      type: Boolean,
      default: true,
    },
    typeId: {
      type: String,
      ref: "RoomType",
    },
  },
  { timestamps: true }
);

export const Room = mongoose.model<IRoom>("Room", roomSchema);
