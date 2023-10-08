import express from 'express';
import { login } from '../controllers/userControllers.js';
import http from 'http';
import { Server } from 'socket.io';

const router = express();

const server = http.createServer(router);

const io = new Server(server);



// Function to update user's online status in the database (replace with your database logic)


router.post('/login', async (req, res) => {
  const { Email, Password } = req.body;
  const result = await login(Email, Password, io);

  io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Extract Username from the query parameter passed during the connection
  
    socket.on('disconnect', async () => {
      console.log('A user disconnected');
  
      
    });
  });
  
  if (result.success) {
    res.status(200).json({ token: result.token, user: result.user });
  } else {
    res.status(400).json({ msg: result.msg });
  }
});

export default router;
