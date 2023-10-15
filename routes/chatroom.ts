import bodyParser from 'body-parser';
import { authorization } from '../controllers/chatRoomControllers.js';
import express from 'express'
const router = express.Router();
router.use(bodyParser.urlencoded({extended: true})) 
router.use(bodyParser.json()) 
router.post('/create', (req, res) => {
  try {
    const Name = req.body.Name;
    if (Name) {
      authorization(Name);
      res.status(200).json({ message: 'Authorization successful' });
    } else {
      res.status(400).json({ message: 'Missing required field: Name' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
