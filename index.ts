import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import cors from 'cors';
import dataSource from './dataBase/dataSource.js';
import register from './routes/register.js';
import login from './routes/login.js';
import rmUser from './routes/rmUser.js';
import path from 'path';
import redis from "redis";
import session from "express-session";
import ConnectRedis from "connect-redis";
import socket from 'socket.io'
import connection from './routes/connection.js';
import sendMessage from './routes/sendMessage.js';
import { Message } from './dataBase/entities/Message.js';
import chatroom from './routes/chatroom.js';
import bodyParser from 'body-parser';
import Block from './routes/Block.js';
import cookieParser from 'cookie-parser';
import unBlock from './routes/unBlock.js';
import listMessages from './routes/listMessages.js';


const app = express();
let server = http.createServer(app);
const PORT = process.env.PORT ||3000;
const publicPath = path.join("./public/");


app.use(express.static(publicPath));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json())
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
      socket.on('online', (socket)=>{
      })
      app.use('/auth',register);
      app.use('/auth',login);
      app.use('/chatroom',chatroom);
         app.use('/Message',sendMessage);
         app.use('/Message',listMessages);
         app.use('/user',Block);
         app.use('/user',unBlock);
         
         socket.emit('newMessage',{
        from:'firas',
        text:'hello everybody',
        CreatedAt : new Date().getTime()
      })
      socket.broadcast.emit('newMessage',{
        from:'firas',
        text:'new user joined',
        CreatedAt : new Date().getTime()
      })
      
      socket.on('createMessage', () => {
        
        // console.log('message', sendMessage );
        
        // // Emit the message to all connected clients, including the sender
        // io.emit('newMessage', {
        //     Message:sendMessage
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





server.listen (PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  dataSource.initializeDB();
 
  
  
});

