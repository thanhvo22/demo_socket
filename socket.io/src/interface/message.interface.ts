import {Document} from "mongoose";

export interface IMessage extends Document{
    
    user_id?: string,
    text?: string,
    room_id?: string,
}