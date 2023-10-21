import bodyParser from 'body-parser';
import { authorization } from '../controllers/chatRoomControllers.js';
import express from 'express'
import { User } from '../dataBase/entities/User.js';
const router = express.Router();
router.use(bodyParser.urlencoded({extended: true})) 
router.use(bodyParser.json()) 
router.post('/create',authorization)
  

export default router;
