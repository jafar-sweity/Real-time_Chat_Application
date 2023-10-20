import express from 'express'
import { sendMessage } from '../controllers/MessageController.js';

import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.json());

export default router.post('/send',  sendMessage
)
  


