const router = require("express").Router();

import userController from "../controllers/user.controller";

router.get('/conversations', userController.getUserInConv);
router.get('/', userController.getAllUsers);
router.get("/:id", userController.getUser);


export default router;