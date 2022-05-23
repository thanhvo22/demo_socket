import {Document} from "mongoose";

export interface IMessage extends Document{
    
    conversationId?: string,
    text?: string,
    sender?: string,
    createdAt?: Date,
}