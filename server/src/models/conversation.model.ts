import { model, Schema } from "mongoose";

interface IConversation {
    members: []
}

const conversationSchema: Schema = new Schema({
  
  members : {
      type : Array
  }
});
export default model<IConversation>("Conversation", conversationSchema);
