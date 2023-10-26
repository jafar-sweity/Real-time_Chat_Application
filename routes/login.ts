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
      res.cookie('fullName', result.user, {
        maxAge: 60 * 60 * 1000,
      });
      res.cookie('loginTime', Date.now(), {
        maxAge: 60 * 60 * 1000,
      });
      res.cookie('token', result.token, {
        maxAge: 60 * 60 * 1000,
      });

      // Send a success response with a status code of 201
      res.status(201).json(result);
    } else {
      // Send an error response with a status code of 400
      res.status(400).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});