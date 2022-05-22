const express = require('express');
const router = express.Router();
import {authController} from '../controllers/auth.controller';

router.post('/register', authController.postRegister);
router.post('/login', authController.postLogin);
router.put('/change-pass/:id', authController.updatePassword);
export default router;