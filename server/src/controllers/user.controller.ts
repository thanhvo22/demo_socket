import accountModel from "../models/account.model";
import * as express from "express";
import {Request, Response} from "express";
const userController = {
    getAllUsers: async (req:Request, res:Response) => {
        const users = await accountModel.find();
        res.json({
            message:`all users`,
            users
        });
    },

    getUser: async (req:Request, res:Response) => {
        const user = await accountModel.findById(req.params.id);
        res.json(user);
    }
}

export default userController