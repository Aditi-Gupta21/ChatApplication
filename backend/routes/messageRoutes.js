import express from "express";
import Authenticated from "../middleware/auth.js";
import {getMessage, sendMessage, editMessage} from "../controllers/messageController.js";

const router = express.Router();

router.route("/send/:id").post(Authenticated,sendMessage);

router.route("/:id").get(Authenticated, getMessage);

router.route("/edit/:messageId").patch(Authenticated,editMessage);

export default router;