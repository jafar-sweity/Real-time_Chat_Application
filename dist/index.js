import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dataSource from './dataBase/dataSource.js';
import register from './routes/register.js';
import login from './routes/login.js';
import rmUser from './routes/rmUser.js';
import path from 'path';
import sendMessage from './routes/sendMessage.js';
import chatroom from './routes/chatroom.js';
import bodyParser from 'body-parser';
import Block from './routes/Block.js';
import cookieParser from 'cookie-parser';
import unBlock from './routes/unBlock.js';
import listMessages from './routes/listMessages.js';
import logout from './routes/logout.js';
import Mute from './routes/Mute.js';
import unMute from './routes/unMute.js';
import uploadAttachmentRouter from './routes/uploadAttachment.js';
import CheckChat from './routes/CheckChat.js';
const app = express();
const server = http.createServer(app);
app.use(cookieParser());
const PORT = process.env.PORT || 3000;
const publicPath = path.join("./public");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(express.json());
// Register routes outside the 'online' event handler
app.use('/auth', register);
app.use('/auth', login);
app.use('/auth', logout);
app.use('/chatroom', chatroom);
app.use('/chatroom', CheckChat);
app.use('/Message', sendMessage);
app.use('/Message', listMessages);
app.use('/user', Block);
app.use('/user', unBlock);
app.use('/user', rmUser);
app.use('/user', Mute);
app.use('/user', unMute);
app.use('/user', uploadAttachmentRouter);
const ADMIN = 'Admin';
const io = new Server(server);
// State
const UsersState = {
    users: [],
    setUsers: function (newUsersArray) {
        this.users = newUsersArray;
    }
};
io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);
    // Upon connection - only to the user
    socket.emit('message', buildMsg(ADMIN, "Welcome to Chat App!"));
    socket.on('enterRoom', ({ name, room }) => {
        // Leave the previous room
        const prevRoom = getUser(socket.id)?.room;
        if (prevRoom) {
            socket.leave(prevRoom);
            io.to(prevRoom).emit('message', buildMsg(ADMIN, `${name} has left the room`));
        }
        const user = activateUser(socket.id, name, room);
        // Cannot update the previous room's users list until after the state update in activate user
        if (prevRoom) {
            io.to(prevRoom).emit('userList', {
                users: getUsersInRoom(prevRoom)
            });
        }
        // Join the room
        socket.join(user.room);
        // To the user who joined
        socket.emit('message', buildMsg(ADMIN, `You have joined the ${user.room} chat room`));
        // To everyone else
        socket.broadcast.to(user.room).emit('message', buildMsg(ADMIN, `${user.name} has joined the room`));
        // Update the user list for the room
        io.to(user.room).emit('userList', {
            users: getUsersInRoom(user.room)
        });
        // Update the rooms list for everyone
        io.emit('roomList', {
            rooms: getAllActiveRooms()
        });
    });
    // When a user disconnects - to all others
    socket.on('disconnect', () => {
        const user = getUser(socket.id);
        userLeavesApp(socket.id);
        if (user) {
            io.to(user.room).emit('message', buildMsg(ADMIN, `${user.name} has left the room`));
            io.to(user.room).emit('userList', {
                users: getUsersInRoom(user.room)
            });
            io.emit('roomList', {
                rooms: getAllActiveRooms()
            });
        }
        console.log(`User ${socket.id} disconnected`);
    });
    // Listening for a message event
    socket.on('message', ({ name, text }) => {
        const room = getUser(socket.id)?.room;
        if (room) {
            io.to(room).emit('message', buildMsg(name, text));
        }
    });
    // Listen for activity
    socket.on('activity', (name) => {
        const room = getUser(socket.id)?.room;
        if (room) {
            socket.broadcast.to(room).emit('activity', name);
        }
    });
});
function buildMsg(name, text) {
    return {
        name,
        text,
        time: new Intl.DateTimeFormat('default', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }).format(new Date())
    };
}
// User functions
function activateUser(id, name, room) {
    const user = { id, name, room };
    UsersState.setUsers([
        ...UsersState.users.filter(user => user.id !== id),
        user
    ]);
    return user;
}
function userLeavesApp(id) {
    UsersState.setUsers(UsersState.users.filter(user => user.id !== id));
}
function getUser(id) {
    return UsersState.users.find(user => user.id === id);
}
function getUsersInRoom(room) {
    return UsersState.users.filter(user => user.room === room);
}
function getAllActiveRooms() {
    return Array.from(new Set(UsersState.users.map(user => user.room)));
}
server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    dataSource.initializeDB();
});
//# sourceMappingURL=index.js.map