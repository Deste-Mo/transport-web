import express from 'express';
import protectedRoute from '../middlewares/protectedRoute.js';
import { allFriend, countFollow, followUser, unfollowUser, updateProfile } from '../controllers/profileController.js';
import  upload from '../middlewares/uploadMiddle.js'

const router = express.Router();

router.post("/follow/:userToFollow", protectedRoute, followUser);
router.post("/unfollow/:userToUnfollow", protectedRoute, unfollowUser);
router.get("/friends", protectedRoute, allFriend);
router.get("/countfollow", protectedRoute, countFollow);
router.post("/updateprofile", protectedRoute,upload.single('profileimage'), updateProfile);
export default router;