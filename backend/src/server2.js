import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import notificationsRoutes from './routes/notificationsRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    req.user = { id: 'some-user-id' }; 
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationsRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});