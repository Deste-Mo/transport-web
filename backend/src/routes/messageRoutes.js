import express from 'express';
import protectedRoute from '../middlewares/protectedRoute.js';
import {
countUnread,
deleteForMe,
deleteMessageId,
getAllUsers,
getConversation,
getMessages,
isViewed,
sendMessage
} from '../controllers/messageController.js';
import uploadMessFile from '../middlewares/uploadMessMiddle.js';

const router = express.Router();

router.post("/send/:receiverId", protectedRoute, uploadMessFile.single('fileContent'), sendMessage);
router.post("/delete/:messageId/:conversationId", protectedRoute, deleteMessageId);
router.post("/deleteforme/:messageId", protectedRoute, deleteForMe);
router.get
    (
        "/conversation",
        protectedRoute,
        getConversation
    );
router.get("/users", protectedRoute, getAllUsers);
router.get("/count", protectedRoute, countUnread);
router.get("/:userIdToChat", protectedRoute, getMessages);
router.get("/seen/:userToChat", protectedRoute, isViewed);
export default router;