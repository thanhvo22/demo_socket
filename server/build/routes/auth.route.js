"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var auth_controller_1 = require("../controllers/auth.controller");
router.post('/register', auth_controller_1.authController.postRegister);
router.post('/login', auth_controller_1.authController.postLogin);
router.put('/change-pass/:id', auth_controller_1.authController.updatePassword);
exports["default"] = router;
