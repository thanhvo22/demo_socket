"use strict";
exports.__esModule = true;
var router = require("express").Router();
var conversation_controller_1 = require("../controllers/conversation.controller");
router.get("/find/:firstUserId/:secondUserId", conversation_controller_1["default"].getConvInTwoUser);
router.post('/', conversation_controller_1["default"].postConversation);
router.get('/:userId', conversation_controller_1["default"].getConvOfUser);
exports["default"] = router;
