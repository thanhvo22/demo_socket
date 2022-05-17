import messController from "../controllers/mess.controller";
const express = require("express");
const router = express.Router();

router.get('/', messController.getMess);
router.post('/create', messController.postCreateMessage);
router.post("/v1/create", messController.postSendMessages);
export default router;