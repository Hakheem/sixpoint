import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  userId: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "CHECKED_IN" | "CHECKED_OUT";
  checkIn: Date;
  checkOut: Date;
  totalAmount: number;
  paymentMethod: "NONE" | "MPESA" | "PAYSTACK";
  paymentReference?: string;
  emailReminderSent: boolean;
  checkoutReminderSent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED", "CHECKED_IN", "CHECKED_OUT"],
      default: "PENDING",
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    paymentMethod: {
      type: String,
      enum: ["NONE", "MPESA", "PAYSTACK"],
      default: "NONE",
    },
    paymentReference: String,
    emailReminderSent: {
      type: Boolean,
      default: false,
    },
    checkoutReminderSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
