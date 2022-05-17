import { model, Schema } from "mongoose";

import { IMessage } from "../interface/message.interface";
const messageSchema: Schema = new Schema({
  
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Account"
  },
  text: {
    type: String,
    
  },
  room_id: {
    type: Schema.Types.ObjectId,
    ref: "Room"
  },
});
export default model<IMessage>("Message", messageSchema);
