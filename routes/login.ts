import express from 'express';
import { login } from '../controllers/userControllers.js';

const router = express.Router();




// Function to update user's online status in the database (replace with your database logic)


export default router.post('/login', async (req: express.Request, res: express.Response) => {
  const Email = req.body.Email;
  const Password = req.body.Password;

  try {
    const result = await login(Email, Password);

    if (result.success) {
      console.log(result.user);
      
      res.cookie('Username', result.user, {
        maxAge: 60 * 60 * 1000,
      });
      res.cookie('loginTime', Date.now(), {
        maxAge: 60 * 60 * 1000,
      });
      res.cookie('token', result.token, {
        maxAge: 60 * 60 * 1000,
      });

      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});