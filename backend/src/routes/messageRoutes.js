import express from 'express';

const router = express.Router();

router.get('/conversations', (req, res) => {
    res.send('Welcome to message page');
})

export default router;