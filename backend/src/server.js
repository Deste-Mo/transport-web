import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const port = process.env.PORT || 3000;


import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

import { app, server } from './socket/socket.js';

const allowedOrigins = 'http://192.168.0.110:5173';
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};


// MiddleWare
app.use(express.static('uploads'))
app.use(express.json());

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(cookieParser())

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/profile', profileRoutes);

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
