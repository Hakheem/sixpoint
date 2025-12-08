import mongoose, { Schema, Document } from "mongoose";

export interface IBookingRoom extends Document {
  bookingId: string;
  roomId: string;
  createdAt: Date;
}

const bookingRoomSchema = new Schema<IBookingRoom>(
  {
    bookingId: {
      type: String,
      ref: "Booking",
      required: true,
    },
    roomId: {
      type: String,
      ref: "Room",
      required: true,
    },
  },
  { timestamps: true }
);

bookingRoomSchema.index({ bookingId: 1, roomId: 1 }, { unique: true });

export const BookingRoom = mongoose.model<IBookingRoom>(
  "BookingRoom",
  bookingRoomSchema
);
