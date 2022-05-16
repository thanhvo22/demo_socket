"use strict";
exports.__esModule = true;
var room_controller_1 = require("../controllers/room.controller");
var express = require("express");
var router = express.Router();
router.get('/', room_controller_1.roomController.getRooms);
router.get('/:id', room_controller_1.roomController.getRoom);
router.post('/create', room_controller_1.roomController.postCreateRoom);
exports["default"] = router;
