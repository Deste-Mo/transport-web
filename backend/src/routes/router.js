// backend/src/routes/router.js

const express = require('express');
const router = express.Router();
const { getFriendInvitations } = require('../controllers/friendsController');

router.get('/friends', getFriendInvitations);

module.exports = router;
