import roomModel from "../models/room.model";
import * as express from "express";
import { Request, Response } from "express";
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

const getRooms = async (req, res) => {
  const rooms = await roomModel.find();
  res.json(rooms);
};
const getRoom = async (req: Request, res: Response) => {
  const id = req.params.id;
  const room = await roomModel.findById(id);
  res.cookie("room_id", room.id);
  res.json(room);
};

const postCreateRoom = async (req: Request, res: Response) => {
  console.log("postCreateRoom");
  const { roomName } = req.body;
  const user_id = req.signedCookies.cookie_id;
  console.log(`user id: `, user_id);
  const checkRoom = roomModel.findOne({ roomName });
  if (!checkRoom) {
    const room = await roomModel.create({
      roomName,
      user_id,
    });
    console.log(`room created: ${room}`);
  }
  await roomModel.findOneAndUpdate({ $push: { user_id } });
  io.emit('server-send-rooms', roomName);
  res.sendStatus(200);
};

export default {
  postCreateRoom, getRoom, getRooms
}