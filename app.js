const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('join', (username) => {
        socket.username = username;
        io.emit('chat message', `${socket.username} has joined the chat`);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', `${socket.username}: ${msg}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        io.emit('chat message', `${socket.username} has left the chat`);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});