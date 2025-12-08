import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  title: string;
  message: string;
  type:
    | "BOOKING_CONFIRMED"
    | "CHECKIN_REMINDER"
    | "CHECKOUT_REMINDER"
    | "SYSTEM_ALERT"
    | "NEW_REVIEW";
  isRead: boolean;
  userId?: string;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "BOOKING_CONFIRMED",
        "CHECKIN_REMINDER",
        "CHECKOUT_REMINDER",
        "SYSTEM_ALERT",
        "NEW_REVIEW",
      ],
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);
