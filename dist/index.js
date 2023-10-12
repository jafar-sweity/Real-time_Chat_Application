import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dataSource from './dataBase/dataSource.js';
import register from './routes/register.js';
import login from './routes/login.js';
import rmUser from './routes/rmUser.js';
import path from 'path';
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
io.on('connection', (socket) => {
    console.log(`Client connected with ID: ${socket.id}`);
    app.use(`/${socket.id}`, register);
    app.use(`/${socket.id}`, login);
    app.use(`/${socket.id}`, rmUser);
});
server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    dataSource.initializeDB();
});
//# sourceMappingURL=index.js.map