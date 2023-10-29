import express from 'express';
import { sendMessage, sendMessage11 } from '../controllers/MessageController.js';
import { ChatRoom } from '../dataBase/entities/Chatroom.js';
import { send } from 'process';

const router = express.Router();
router.use(express.json());

export default router.post('/sendMessage1-1', async (req, res) => {
  try {
    const sender = req.cookies['Username'];
    const receiver = req.body.receiver;
    const Content = req.body.Content;
    

    // Create a chat room with a unique name based on sender and receiver
    if (!sender || !receiver || !Content) {
        return res.status(400).json({ message: 'Missing required fields' });
        }

        if (sender === receiver) {  
            return res.status(400).json({ message: 'Sender and receiver cannot be the same' });
        }
    const existedChatRoom = await ChatRoom.findOne({ where: { Name: sender + receiver } });
    if (existedChatRoom) {
        console.log("chatroom already exist");
        const data  =  await sendMessage11(sender,receiver,Content,existedChatRoom);
        return res.status(200).json({ status: 'Message sent successfully',chatRoom:existedChatRoom, message: data });
    }
    
      
             const chatRoom = new ChatRoom();
    chatRoom.Name = sender + receiver;
   chatRoom.user = [sender,receiver];
   chatRoom.Type = "1-1";

    await ChatRoom.save(chatRoom);
    const data  =  await sendMessage11(sender,receiver,Content,chatRoom);
        
        

    console.log('The chat room created successfully, and the message was sent.');

    // You can return some success response here if needed
    res.status(200).json({ status: 'Chat room created and message sent', chatRoom: chatRoom, message: data});
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ status: 'Error', error: error.message });
  }
});

