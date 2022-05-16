import { Document } from "mongoose";

export interface IAccount extends Document {
  email?: string;
  pass?: string;
  name?: string;
  
}