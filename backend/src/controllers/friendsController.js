// backend/src/controllers/friendsController.js

const { fetchFriendInvitations } = require('../services/api');

const getFriendInvitations = async (req, res) => {
    try {
        const invitations = await fetchFriendInvitations();
        res.json(invitations);
    } catch (error) {
        console.error('Error fetching invitations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getFriendInvitations,
};
