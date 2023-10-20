
import express from 'express'
import { logout } from '../controllers/userControllers.js';

const app = express.Router();

 app.post('/logout', logout);

 export default app;