import { model, Schema } from "mongoose";

import { IMessage } from "../interface/message.interface";
const messageSchema: Schema = new Schema({
  
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: "Conversation"
  },
  text: {
    type: String,
    
  },
  sender: {type: String
  },
  createdAt: {type: Date, default: Date.now()},
});
export default model<IMessage>("Message", messageSchema);
