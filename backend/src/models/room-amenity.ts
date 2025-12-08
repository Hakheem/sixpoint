import mongoose, { Schema, Document } from "mongoose";

export interface IRoomAmenity extends Document {
  roomId: string;
  amenityId: string;
  createdAt: Date;
}

const roomAmenitySchema = new Schema<IRoomAmenity>(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    amenityId: {
      type: Schema.Types.ObjectId,
      ref: "Amenity",
      required: true,
    },
  },
  { timestamps: true }
);

roomAmenitySchema.index({ roomId: 1, amenityId: 1 }, { unique: true });

export const RoomAmenity = mongoose.model<IRoomAmenity>(
  "RoomAmenity",
  roomAmenitySchema
);
