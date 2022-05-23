import messController from "../controllers/mess.controller";
const express = require("express");
const router = express.Router();

router.post('/', messController.postMess);
router.get('/:conversationId',messController.getConvId);
router.post('/create', messController.postCreateMessage);
// router.post("/v1/create", messController.postSendMessages);
export default router;