import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  rating: number;
  comment?: string;
  hidden: boolean;
  userId: string;
  roomId: string;
  bookingId: string;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: String,
    hidden: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    roomId: {
      type: String,
      ref: "Room",
      required: true,
    },
    bookingId: {
      type: String,
      ref: "Booking",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model<IReview>("Review", reviewSchema);
