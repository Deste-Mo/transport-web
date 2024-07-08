import express from 'express';
import cors from "cors";

import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

const app = express();
const port = 3000;

// MiddleWare
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
