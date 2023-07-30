const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const port = process.env.BACKEND_PORT || 3000

io.on('connection', (socket) => {
    console.log('New client connected')

    socket.on('message', (data) => {
        console.log('Message received:', data)
        io.emit('message', data)
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })
})

server.listen(port, () => {
    console.log(`Server running on http://0.0.0.0:${port}`)
})