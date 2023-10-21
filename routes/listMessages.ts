import express from 'express';
import { Message } from '../dataBase/entities/Message.js';
import { ChatRoom } from '../dataBase/entities/Chatroom.js';

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const chatRoomName = req.body.chatRoomName;

    // Find the chat room by name
    const chatRoom:any = await ChatRoom.findOne({ where: { Name: chatRoomName } });

    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room not found' });
    }

    // Retrieve messages for the chat room
    const messages = await Message.find({
      where: { chatRoom:chatRoom.ChatRoomID},
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages by chat room:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

export default router;
