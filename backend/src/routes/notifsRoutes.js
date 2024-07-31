import express from 'express';
import protectedRoute from '../middlewares/protectedRoute.js';
import { delAllNotifications, deleteNotifications, getAllNotifs, getNotificationViewed, sendNotifs, sendNotifsNewPub, setAllNotificationViewed, setNotificationViewed } from '../controllers/notifController.js';
const router = express.Router();

router.get("/getnotifs", protectedRoute, getAllNotifs);
router.get("/unreadnotif", protectedRoute, getNotificationViewed);
router.post("/sendnotifs/:userId", protectedRoute, sendNotifs);
router.post("/viewnotifs/:notifid", protectedRoute, setNotificationViewed);
router.post("/viewnotifs", protectedRoute, setAllNotificationViewed);
router.post("/sendnotifs", protectedRoute, sendNotifsNewPub);
router.post("/delallnotifs", protectedRoute, delAllNotifications);
router.post("/delnotif/:notifid", protectedRoute, deleteNotifications);

export default router;