import express from 'express';
import { getMe, login, refreshAccessToken, signup, setImageProfile, logout } from '../controllers/authController.js';
import { forgotPassword, resetPassword } from '../controllers/passwordController.js';
import protectedRoute from '../middlewares/protectedRoute.js';
import upload from '../middlewares/uploadMiddle.js';
import { getAllSubscription, sendConfirmMail, subscribe } from '../controllers/subscController.js';


const router = express.Router();

router.get('/subscribe/:userId/:subId',subscribe);
router.get('/allsubscribtion',getAllSubscription);
router.post('/sendconfirm/:userId/:subId', sendConfirmMail);

export default router;