import mongoose, { Schema, Document } from "mongoose";

export interface IRoomExtraService extends Document {
  roomId: string;
  extraServiceId: string;
  createdAt: Date;
}

const roomExtraServiceSchema = new Schema<IRoomExtraService>(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    extraServiceId: {
      type: Schema.Types.ObjectId,
      ref: "ExtraService",
      required: true,
    },
  },
  { timestamps: true }
);

roomExtraServiceSchema.index(
  { roomId: 1, extraServiceId: 1 },
  { unique: true }
);

export const RoomExtraService = mongoose.model<IRoomExtraService>(
  "RoomExtraService",
  roomExtraServiceSchema
);
