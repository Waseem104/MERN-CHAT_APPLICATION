import express from "express";
import {
  checkAuthController,
  loginController,
  logoutController,
  signupController,
  updateProfileController,
} from "../Controllers/auth.controller.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupController);

router.post("/login", loginController);

router.post("/logout", logoutController);

router.put("/update-profile", protectRoute, updateProfileController);

router.get("/check", protectRoute, checkAuthController);

export default router;
