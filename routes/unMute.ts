import express from 'express';
import { unmute } from '../controllers/MuteController.js';
import cookieParser from 'cookie-parser';
const app = express.Router();
app.use(cookieParser());
export default app.post('/unMute', unmute);
