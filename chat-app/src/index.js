const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');

const pulicDirPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
    console.log('New Websocket connection.')
    // socket.emit('countUpdated', count)
    socket.emit("message", "Welcome");
    socket.broadcast.emit('message', 'a new user has joined');

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }
        io.emit('sendMessage', message)
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        io.emit('message', coords)
        callback('location shared')
    })

    socket.on('disconnect', () => {
        io.emit('message', 'a user has left')
    })
})

app.use(express.static(pulicDirPath))

app.get("", (req, res) => {
    res.render("index.html");
})

server.listen(port, () => {
    console.log("listening on ", +port)
})