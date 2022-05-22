const router = require("express").Router();
import conversationCTL from "../controllers/conversation.controller";


router.get("/find/:firstUserId/:secondUserId",conversationCTL.getConvInTwoUser);
router.post('/', conversationCTL.postConversation);
router.get('/:userId', conversationCTL.getConvOfUser);
export default router;