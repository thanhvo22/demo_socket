import accountModel from "../models/account.model";
import * as express from "express";
import { Request, Response } from "express";
const userController = {
  getAllUsers: async (req: Request, res: Response) => {
    const users = await accountModel.find();
    res.json({
      message: `all users`,
      users,
    });
  },

  getUser: async (req: Request, res: Response) => {
    const user = await accountModel.findById(req.params.id);
    res.json(user);
  },

  getUserInConv: async (req: Request, res: Response) => {
    console.log(`test `);
    const userId = req.query.userId;
    console.log(`userId: ${userId}`);
    const username = req.query.username;
    try {
      const user = userId
        ? await accountModel.findById({_id:userId})
        : await accountModel.findOne({ email: username });

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default userController;
