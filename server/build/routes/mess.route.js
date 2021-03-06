"use strict";
exports.__esModule = true;
var mess_controller_1 = require("../controllers/mess.controller");
var express = require("express");
var router = express.Router();
router.post('/', mess_controller_1["default"].postMess);
router.get('/:conversationId', mess_controller_1["default"].getConvId);
router.post('/create', mess_controller_1["default"].postCreateMessage);
// router.post("/v1/create", messController.postSendMessages);
exports["default"] = router;
