import express from 'express';
import { login } from '../controllers/userControllers.js';
const router = express();




// Function to update user's online status in the database (replace with your database logic)


router.post('/login', async (req, res) => {
  const { Email, Password } = req.body;
  const result = await login(Email, Password); // Access io instance from req
  
  if (result.success) {
    res.status(200).json({ token: result.token, user: result.user });
  } else {
    res.status(404).json({ msg: result.msg });
  }
});


export default router;
