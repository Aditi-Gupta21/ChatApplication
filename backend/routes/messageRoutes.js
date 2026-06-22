import express from "express";
import Authenticated from "../middleware/auth.js";
import {getMessage, sendMessage} from "../controllers/messageController.js";

const router = express.Router();

router.route("/send/:id").post(Authenticated,sendMessage);
router.route("/:id").get(Authenticated, getMessage);

export default router;