import roomModel from "../models/room.model";
import * as express from "express";
import { Request, Response } from "express";
export const roomController = {
  getRooms: async (req, res) =>{
    
    const rooms = await roomModel.find();
    res.json(rooms);
  },
  getRoom: async (req: Request, res: Response) => {
    const id = req.params.id;
    const room = await roomModel.findById(id);
    res.cookie("room_id", room.id);
    res.json(room);
  },

  postCreateRoom: async (req: Request, res: Response) => {
    console.log("postCreateRoom");
    const {roomName} = req.body;
    console.log(roomName);
    const user_id = req.signedCookies.cookie_id;
    console.log(`user id: `, user_id);
    const room = await roomModel.create({
      user_id,
      roomName
    });
    console.log(room);
    res.json(room);
  },
};
