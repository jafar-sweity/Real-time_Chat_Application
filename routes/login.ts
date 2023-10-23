import express from 'express';
import { login } from '../controllers/userControllers.js';
import socket from 'socket.io'
const router = express.Router();  
export default router.post('/login', login);