import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import { UnblockUser } from '../controllers/BlockController.js';


const app = express.Router();



export default app.delete('/unBlock',UnblockUser);


