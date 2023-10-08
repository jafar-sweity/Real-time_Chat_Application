import express from 'express';
import { registerUser } from '../controllers/userControllers.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const Username = req.body.Username;
  const Email = req.body.Email;
  const Password = req.body.Password;
  const result = await registerUser(Username, Email, Password);
  
  
  if (result.success) {
    res.status(201).json({ msg: result.msg });
  } else {
    res.status(400).json({ msg: result.msg });
    
  }

});


export default router;
