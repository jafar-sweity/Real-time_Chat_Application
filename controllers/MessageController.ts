import { getRepository } from "typeorm";
import { Message } from "../dataBase/entities/Message.js";
import { ChatRoom } from "../dataBase/entities/Chatroom.js";
import express from 'express';
import bodyParser from "body-parser";
import { User } from "../dataBase/entities/User.js";


export const sendMessage = async (req : express.Request, res:express.Response) => {
  try {
    const Username = req.body.Username;
    const ChatRoomName = req.body.ChatRoom;
    const Content = req.body.Content;

    const chatRoom = await ChatRoom.findOne({ where: { Name: ChatRoomName } });

    if (!chatRoom) {
      return res.status(404).json({ status: 'Chat room not found' });
    }

    // Find the user by Username
    const user = await User.findOne({ where: { Username:Username } });

    if (!user) {
      return res.status(404).json({ status: 'User not found' });
    }

    // Create a new message
    const newMessage = new Message();
    newMessage.user = user;
    newMessage.Content = Content;
    newMessage.chatRoom = chatRoom;

    const savedMessage = await Message.save(newMessage);

    // Return the saved message as a response
    res.status(201).json({ status: 'Message sent successfully', message: savedMessage });
  } catch (error:any) {
    // Handle any errors that might occur during the database operation
    console.error('Error sending message:', error);

    // Return a status indicating failure
    res.status(500).json({ status: 'Message sending failed', error: error.message });
  }
};
