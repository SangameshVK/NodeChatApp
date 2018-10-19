const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
//console.log(__dirname + '/../public');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to chat room',
        createdAt: new Date().getTime()
    });
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });
    socket.on('createMessage', (message) => {
        console.log("Create new Message", message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: 123
        });
        // socket.broadcast.emit('newMessage', {
        //     from: message.text,
        //     text: message.text,
        //     createdAt: 123
        // });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`server is up on port ${port}`);
});
