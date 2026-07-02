import express from 'express'
import Authenticated from '../middleware/auth.js'
import { getSidebarConversations, markConversationAsRead } from '../controllers/conversationController.js'

const router = express.Router();

router.route("/sidebar").get(Authenticated,getSidebarConversations);

router.route("/:id/read").patch(Authenticated, markConversationAsRead);

export default router;