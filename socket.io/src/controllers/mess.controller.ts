import * as express from "express";
import {Request, Response} from "express";
import messageModel from "../models/message.model";
import roomModel from "../models/room.model";

var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
const messController = {
    getMess: async (req:Request,res:Response) => {
        const id = req.signedCookies.cookie_id;
        const message = await messageModel.find();
        res.json(message);
    },
    postCreateMessage: async (req:Request,res:Response) => {
        const {text} = req.body;
        const id = req.signedCookies.cookie_id;
        const room_id = req.signedCookies.room_id;
        const newMess  = await messageModel.create({
            text,
            user_id: id,
            room_id
        })
        io.emit('message', text);
        // res.json(newMess);
    },
    postSendMessages: async (req:Request, res:Response) => {
        // const { room_id, user_id, text } = req.body;
        const room_id = req.signedCookies.room_id;
        const user_id = req.signedCookies.cookie_id;
        const room = await roomModel.findOne({ id: room_id });
        
        const {text} = req.body;
        const newMess= await roomModel.create({
            text,
            user_id,
            room_id,
        })
       
        const updatedRoom = await roomModel.findOne({ id: room_id });
        console.log(`updatedRoom: ${updatedRoom}` )
        // socket.on('chat message', newMess => {
        //     console.log(`${socket.id}`, newMess.text)
        //     io.emit('chat message', newMess.text);
        // });
        // _io.to(idRoom).emit('replySendMessage', { messages: updatedRoom.messages });
        
      }
}
export default messController;