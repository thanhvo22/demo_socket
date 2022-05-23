"use strict";
exports.__esModule = true;
var router = require("express").Router();
var user_controller_1 = require("../controllers/user.controller");
router.get('/conversations', user_controller_1["default"].getUserInConv);
router.get('/', user_controller_1["default"].getAllUsers);
router.get("/:id", user_controller_1["default"].getUser);
exports["default"] = router;
