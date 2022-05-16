"use strict";
exports.__esModule = true;
var mess_controller_1 = require("../controllers/mess.controller");
var express = require("express");
var router = express.Router();
router.get('/', mess_controller_1.messController.getMess);
router.post('/create', mess_controller_1.messController.postCreateMessage);
exports["default"] = router;
