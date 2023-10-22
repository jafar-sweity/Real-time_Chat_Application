import express from 'express';
import { login } from '../controllers/userControllers.js';
import socket from 'socket.io'
const router = express.Router();




// Function to update user's online status in the database (replace with your database logic)


export default router.post('/login', login);