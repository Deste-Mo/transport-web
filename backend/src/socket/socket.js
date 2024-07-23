import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_HOST,
        methods: ["GET", "POST"]
    }
})

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const userSocketMap = {
    userId: ""
};

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId) userSocketMap[userId] = socket.id;


    //io.emit() utiliser pour envoyer des evenement a tout les utilisateur connecter
    io.emit("getActiveUsers", Object.keys(userSocketMap));


    // socket.on() utiliser pour ecouter des evenement a la fois utilisable cote server et client 
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];

        io.emit("getActiveUsers", Object.keys(userSocketMap));
    });

});

export { app, io, server };