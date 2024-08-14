import express from 'express';
import { getMe, login, refreshAccessToken, signup, setImageProfile, logout } from '../controllers/authController.js';
import { forgotPassword, resetPassword } from '../controllers/passwordController.js';
import protectedRoute from '../middlewares/protectedRoute.js';
import upload from '../middlewares/uploadMiddle.js';


const router = express.Router();


router.get('/me/:profileId', protectedRoute, getMe);
router.get('/me/', protectedRoute, getMe);

router.post('/signup',signup);

router.post('/login',login);

router.post('/logout', logout);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', resetPassword);

// router.post('/token', refreshAccessToken)

router.get('/token', refreshAccessToken );

router.post('/profileImage', protectedRoute, upload.single('profileImage'), setImageProfile)

export default router;