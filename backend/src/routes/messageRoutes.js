import express from 'express';
import protectedRoute from '../middlewares/protectedRoute.js';
import { countUnread, getAllUsers, getConversation, getMessages, isViewed, sendMessage } from '../controllers/messageController.js';

const router = express.Router();

router.post("/send/:receiverId", protectedRoute, sendMessage);
router.get("/conversation", protectedRoute, getConversation);
router.get("/users", protectedRoute, getAllUsers);
router.get("/count", protectedRoute, countUnread);
router.get("/:userIdToChat", protectedRoute, getMessages);
router.get("/seen/:userToChat", protectedRoute, isViewed);
export default router;