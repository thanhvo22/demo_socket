import { model, Schema } from "mongoose";
import { IAccount } from "../interface/accout.interface";
const accountSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },

    pass: {
      type: String,
      required: true,
    },

    name: {
      type: String,
    }
  },
  { timestamps: true }
);

export default model<IAccount>("Account", accountSchema);