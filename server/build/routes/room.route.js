"use strict";
exports.__esModule = true;
var room_controller_1 = require("../controllers/room.controller");
var express = require("express");
var router = express.Router();
router.get('/', room_controller_1["default"].getRooms);
router.get('/:id', room_controller_1["default"].getRoom);
router.post('/create', room_controller_1["default"].postCreateRoom);
exports["default"] = router;
