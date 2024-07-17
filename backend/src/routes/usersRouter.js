const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Endpoint pour récupérer les utilisateurs par type de compte
router.get('/users/:accountType', userController.getUsersByType);

module.exports = router;
