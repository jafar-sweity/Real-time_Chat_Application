import express from 'express';
import { authorization } from '../controllers/chatRoomControllers.js';


const router=  express.Router();


router.post('/create', (req, res) => {
    try {
      const Name = req.body.Name;
  
      // Assuming authorization is a function that may throw errors
      authorization(Name);
  
      // Send a success response if no errors occurred
      res.status(200).json({ message: 'Authorization successful' });
    } catch (error) {
      // Handle errors

      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

export default router ;