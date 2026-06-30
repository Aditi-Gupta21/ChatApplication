import express from 'express'
import Authenticated from '../middleware/auth.js'
import { getSidebarConversations } from '../controllers/conversationController.js'

const router = express.Router();

router.route("/sidebar").get(Authenticated,getSidebarConversations);

export default router;