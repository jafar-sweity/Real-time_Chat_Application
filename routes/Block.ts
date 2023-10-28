import express from 'express';
import { blockUser } from '../controllers/BlockController.js';
import cookieParser from 'cookie-parser';

const app = express.Router();
app.use(cookieParser());

export default app.post('/block',blockUser);

