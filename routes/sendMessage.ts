import express from 'express'
import { ChatRoom } from '../dataBase/entities/Chatroom.js';
import { sendMessage } from '../controllers/MessageController.js';
import { Message } from '../dataBase/entities/Message.js';
import { User } from '../dataBase/entities/User.js';

const router = express.Router();



router.post('/send', async (req, res) => {
    try {
      const { SenderUserId, chatRoomID, Content, Attachment } = req.body;
  
      const isChatRoom :any= await ChatRoom.findOne({ where: { ChatRoomID: chatRoomID } });
      const user:any = await User.findOne({ where: { UserId: SenderUserId } });
  
      if (!isChatRoom) {
        // If the chat room doesn't exist, return an error response
        return res.status(404).json({ message: 'Chat room not found' });
      }
  
      if (!user) {
        // If the user doesn't exist, return an error response
        return res.status(404).json({ message: 'User not found' });
      }
  
      const newMess = new Message();
      newMess.ChatRoomID = isChatRoom;
      newMess.Content = Content;
      newMess.attachment = Attachment;
      newMess.user = user;
      
  
      // Assuming sendMessage is an asynchronous function
      await sendMessage(newMess, Attachment);
  
      // Send a success response
      res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

export default router;

