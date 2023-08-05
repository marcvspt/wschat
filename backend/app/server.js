const http = require('http');
const socketIO = require('socket.io');

const PORT = process.env.BACKEND_PORT || 3000;

const corsOptions = {
    origin: (origin, callback) => {
        // PUT YOUR DOMAINS OR HOST TO ALLOW THE CORS
        const ACCEPTED_ORIGINS = [
            'http://localhost',
            'http://example-domain.local'
        ];

        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }

        if (!origin) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['OPTIONS', 'HEAD', 'GET', 'POST', 'PATCH', 'DELETE', 'PUT']
}

const server = http.createServer();
const ws = socketIO(server, {
    cors: corsOptions
});

ws.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (data) => {
        console.log('Message received:', data);
        ws.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});