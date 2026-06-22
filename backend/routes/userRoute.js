import express from "express";
import { register,login, logout ,getOtherUser} from "../controllers/userController.js";
import Authenticated from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(Authenticated,getOtherUser);

export default router;