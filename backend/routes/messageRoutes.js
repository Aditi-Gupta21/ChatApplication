import express from "express";
import Authenticated from "../middleware/auth.js";
import {
  sendMessage,
  getMessage,
  editMessage,
  deleteMessage,
  deleteMessageForMe,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/send/:id", Authenticated, sendMessage);
router.get("/:id", Authenticated, getMessage);

router.patch("/edit/:messageId", Authenticated, editMessage);
router.patch("/delete/:messageId", Authenticated, deleteMessage);
router.patch("/deleteforme/:messageId", Authenticated, deleteMessageForMe);

export default router;