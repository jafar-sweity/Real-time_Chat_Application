import express from 'express';
import { login } from '../controllers/userControllers.js';
import socket from 'socket.io'
const router = express.Router();




// Function to update user's online status in the database (replace with your database logic)


router.post('/login', async (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;
  const onlinestatus:boolean = true;

  const result = await login(Email, Password,onlinestatus); // Access io instance from req

  if (result.success) {
     res.cookie('Username', result.user, {
        maxAge: 60 * 60 * 1000
      });

   
      
      res.cookie('token', result.token, {
        maxAge: 60 * 60 * 1000
      });
    res.status(200).json({ token: result.token, user: result.user });
  } else {
    res.status(404).json({ msg: result.msg });
  }
});



export default router;
