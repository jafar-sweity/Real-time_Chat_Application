
import express from 'express'
import { logout } from '../controllers/userControllers.js';

const app = express();


 app.post('logout', (req,res)=>{
    logout(req,res);
 })

 export default app;