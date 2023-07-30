const express = require('express');
const http= require('http');
const {Server} = require('socket.io');
const app = express();

let activeSessions = 0;


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    activeSessions+=1;
    io.emit('sessionCountUpdate', activeSessions);

    socket.on('disconnect', () => {
        activeSessions-=1;
        io.emit('sessionCountUpdate', activeSessions);
    });

    socket.on('getSessionCount', () => {
        io.to(socket.id).emit('sessionCountUpdate', activeSessions);
    });
});

console.log(`Сервер запущен на порту ${activeSessions}`);

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
