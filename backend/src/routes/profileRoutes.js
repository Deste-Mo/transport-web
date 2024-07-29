import express from 'express';
import protectedRoute from '../middlewares/protectedRoute.js';
import { allFriend, countFollow, followUser, unfollowUser } from '../controllers/profileController.js';

const router = express.Router();

router.post("/follow/:userToFollow", protectedRoute, followUser);
router.post("/unfollow/:userToUnfollow", protectedRoute, unfollowUser);
router.get("/friends", protectedRoute, allFriend);
router.get("/countfollow", protectedRoute, countFollow);

export default router;