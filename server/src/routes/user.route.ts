const router = require("express").Router();
import {Request, Response} from "express";
import userController from "../controllers/user.controller";

router.get('/', userController.getAllUsers);
router.get("/:id", userController.getUser);

export default router;