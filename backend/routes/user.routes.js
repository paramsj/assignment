import { Router } from "express";
import { registerUser, loginUser,  logoutUser, refreshAccessToken, getCurrentUser, updateAccountDetails } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = new Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken)
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/me").get(verifyJWT, getCurrentUser);
router.route("/update").patch(verifyJWT, updateAccountDetails);

export default router;