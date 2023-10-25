import express from 'express';
import { ChatRoom } from '../dataBase/entities/Chatroom.js';


const app = express();
app.use(express.json());

export default app.post('/CheckChat', async(req,res) => {

    const Name = req.body.Name;
    const isExist = await ChatRoom.findOne({ where: { Name: Name } })
    if (isExist) {
        return res.status(200).json({ message: `ChatRoom ${Name} exists` });
    }else{
    return res.status(404).json({ message: `ChatRoom ${Name} not exists` });
   }



});