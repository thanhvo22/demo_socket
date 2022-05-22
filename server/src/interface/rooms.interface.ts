import { Document } from "mongoose";
export interface IRoom extends Document{
    roomName?: string;
    user_id?: [string];
}