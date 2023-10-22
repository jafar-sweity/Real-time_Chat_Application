import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import { unblockUser } from '../controllers/BlockController.js';


const app = express.Router();
app.use(cookieParser());    
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


export default app.post('/unBlock',unblockUser);


