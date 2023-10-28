import express from 'express';
import { mute } from '../controllers/MuteController.js';
import cookieParser from 'cookie-parser';
const app = express.Router();
app.use(cookieParser());
export default app.post('/mute', mute);
