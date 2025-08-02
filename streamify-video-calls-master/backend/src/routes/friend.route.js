import express from "express";
import { removeFriendController } from "../controllers/friend.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// DELETE /api/friends/:id
router.delete("/:id", protectRoute, removeFriendController);

export default router;