import express from 'express';
import { login } from '../controllers/userControllers.js';
import socket from 'socket.io'
const router = express.Router();




// Function to update user's online status in the database (replace with your database logic)


export default router.post('/login',async(req:express.Request,res:express.Response)=>{

  const Email = req.body.Email;
  const Password = req.body.Password;
  
  const result = await login( Email, Password);  
  

      res.cookie('fullName', result.user, {
        maxAge: 60 * 60 * 1000
      });
      res.cookie('loginTime', Date.now(), {
        maxAge: 60 * 60 * 1000
      });
      res.cookie('token', result.token, {
        maxAge: 60 * 60 * 1000
      });

      res.send();

  if (result.success) {
    res.status(201).json({ msg: result.msg });
  } else {
    res.status(400).json({ msg: result.msg });
  }
});