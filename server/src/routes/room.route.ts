import roomController from "../controllers/room.controller";
const express = require("express");
const router = express.Router();

router.get('/', roomController.getRooms );
router.get('/:id', roomController.getRoom );
router.post('/create', roomController.postCreateRoom);


export default router;