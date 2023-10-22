
import express from 'express'
import { logout } from '../controllers/userControllers.js';

const app = express.Router();

 export default app.post('/logout', logout);

