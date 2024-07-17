const express = require('express');
const {newPublication, }= require ('../controllers/offreController');

const router = express.Router();

// Route to save a new publication
router.post('/newPublication', newPublication);


// export the modules

module.exports = router;

