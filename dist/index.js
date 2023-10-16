import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dataSource from './dataBase/dataSource.js';
import register from './routes/register.js';
import login from './routes/login.js';
import path from 'path';
import sendMessage from './routes/sendMessage.js';
import chatroom from './routes/chatroom.js';
const app = express();
let server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const publicPath = path.join("./public/");
app.use(express.static(publicPath));
let io = new Server(server);
// const socketIOMiddleware = (socket: socket.Socket) =>{
//   if (!socket.request) {
//     socket.emit("error", "No session");
//     return;
//   }
// }
// io.use(socketIOMiddleware);
// let io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET'], // Add the HTTP methods you need
//   },
// });
// app.get('/', (req, res) => {
//    res.send('connected!!');
//    console.log('connected');
//  });
//  app.use(`/${socket.id}`, rmUser);
io.on('connection', (socket) => {
    console.log(`Client connected with ID: ${socket.id}`);
    socket.on('online', (socket) => {
    });
    app.use('/auth', register);
    app.use('/auth', login);
    app.use('/chatroom', chatroom);
    app.use('/Message', sendMessage);
    socket.emit('newMessage', {
        from: 'firas',
        text: 'hello everybody',
        CreatedAt: new Date().getTime()
    });
    socket.broadcast.emit('newMessage', {
        from: 'firas',
        text: 'new user joined',
        CreatedAt: new Date().getTime()
    });
    socket.on('createMessage', () => {
        // console.log('message', thing.text );
        // // Emit the message to all connected clients, including the sender
        // io.emit('newMessage', {
        //   from: thing.from,
        //   text: thing.text,
        //   CreatedAt: thing.createdAt
        // });
    });
    socket.on('disconnect', () => {
        console.log(`Client disconnected`);
    });
});
// io.on('online', (socket)=>{
//   app.use(`/users`, register);
//   console.log(`the user with id ${socket.id }is online `)
// })
server.listen(80, () => {
    console.log(`Server is running on PORT ${PORT}`);
    dataSource.initializeDB();
});
//# sourceMappingURL=index.js.map