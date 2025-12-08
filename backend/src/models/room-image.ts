import mongoose, { Schema, Document } from "mongoose";

export interface IRoomImage extends Document {
  url: string;
  alt?: string;
  roomId: string;
  orientation: "PORTRAIT" | "LANDSCAPE";
  createdAt: Date;
}

const roomImageSchema = new Schema<IRoomImage>(
  {
    url: {
      type: String,
      required: true,
    },
    alt: String,
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    orientation: {
      type: String,
      enum: ["PORTRAIT", "LANDSCAPE"],
      default: "PORTRAIT",
    },
  },
  { timestamps: true }
);

export const RoomImage = mongoose.model<IRoomImage>(
  "RoomImage",
  roomImageSchema
);
