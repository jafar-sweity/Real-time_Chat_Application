import express from 'express';
import cookieParser from 'cookie-parser';
import { Message } from '../dataBase/entities/Message.js';
const app = express.Router();
app.use(cookieParser());
export default app.get('/findMessage', (req, res) => {
    const Username = req.cookies['Username'];
    const message = req.body.Message;
   
    Message.find({ where: { Content: message } }).then((data) => {
        console.log('the message found succefully');
        console.log(data); 
    }).catch((error:any) => {
        console.log(error);
    });
});
