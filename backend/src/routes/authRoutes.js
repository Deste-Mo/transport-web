import express from 'express';
import { getMe, login, signup } from '../controllers/authController.js';
import protectedRoute from '../middlewares/protectedRoute.js';

const router = express.Router();


router.get('/me', protectedRoute, getMe);

router.post('/signup',signup)

router.post('/login',login)


export default router;