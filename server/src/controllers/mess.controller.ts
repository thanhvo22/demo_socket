import * as express from "express";
import { Request, Response } from "express";
import messageModel from "../models/message.model";


var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
const messController = {
  postMess: async (req: Request, res: Response) => {
    const newMessage = new messageModel(req.body);
    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getConvId: async (req: Request, res: Response) => {
    try {
      const messages = await messageModel.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  postCreateMessage: async (req: Request, res: Response) => {
    const { text } = req.body;
    const id = req.signedCookies.cookie_id;
    const room_id = req.signedCookies.room_id;
    const newMess = await messageModel.create({
      text,
      user_id: id,
      room_id,
    });
    // io.emit('message', text);
    res.json(newMess);
  },
  // postSendMessages: async (req: Request, res: Response) => {
  //   // const { room_id, user_id, text } = req.body;
  //   const room_id = req.signedCookies.room_id;
  //   const user_id = req.signedCookies.cookie_id;
  //   const room = await roomModel.findOne({ id: room_id });

  //   const { text } = req.body;
  //   const newMess = await roomModel.create({
  //     text,
  //     user_id,
  //     room_id,
  //   });

  //   const updatedRoom = await roomModel.findOne({ id: room_id });
  //   console.log(`updatedRoom: ${updatedRoom}`);
    // socket.on('chat message', newMess => {
    //     console.log(`${socket.id}`, newMess.text)
    //     io.emit('chat message', newMess.text);
    // });
    // _io.to(idRoom).emit('replySendMessage', { messages: updatedRoom.messages });
  // },
};
export default messController;
