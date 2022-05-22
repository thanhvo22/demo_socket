import { model, Schema } from "mongoose";

import { IRoom } from "../interface/rooms.interface";
const roomSchema: Schema = new Schema(
  {
    roomName: { type: String },
    user_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Account",
      },
    ],
  },
  { timestamps: true }
);
export default model<IRoom>("Room", roomSchema);
