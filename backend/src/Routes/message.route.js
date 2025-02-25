import express from "express";
import {
  getMessagesController,
  getUsersForSidebarController,
  sendMessageController,
} from "../Controllers/message.controller.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebarController);
router.get("/:id", protectRoute, getMessagesController);
router.post("/send/:id", protectRoute, sendMessageController);

export default router;
