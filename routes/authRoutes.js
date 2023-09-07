import express from "express";
const router = express.Router();

import {
  register,
  login,
  updateUser,
  updatePassword,
  getCurrentUser,
  logout,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";
import apiLimiter from "../middleware/too-many-request.js";

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.get("/logout", logout);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updatePassword").patch(authenticateUser, updatePassword);
router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);

export default router;
