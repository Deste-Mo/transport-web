import express from 'express';
import {
    createNotification,
    getNotificationsForUser,
    markNotificationAsViewed,
    deleteNotification,
    getPaginatedNotificationsForUser,
    markAllNotificationsAsViewed
} from '../controllers/notificationController.js';

const router = express.Router();

// Routes
router.post('/', createNotification); 
router.get('/:userId', getNotificationsForUser); 
router.put('/:notifId/view', markNotificationAsViewed);
router.delete('/:notifId', deleteNotification); 
router.get('/:userId/paginated', getPaginatedNotificationsForUser); 
router.put('/:userId/viewAll', markAllNotificationsAsViewed); 

export default router;