import { getRepository } from "typeorm";
import { Message } from "../dataBase/entities/Message.js";
import { ChatRoom } from "../dataBase/entities/Chatroom.js";
import express from 'express';
import bodyParser from "body-parser";
import { User } from "../dataBase/entities/User.js";


export const sendMessage = async (req : express.Request, res:express.Response) => {
  try {
    const Username = req.cookies['Username'];
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


export const sendMessage11 = async (sender:User,receiver:User, content:string,chatroomName:ChatRoom) => {
  try {
    // Create a chat room with a unique name based on sender and receiver
    if (!sender || !receiver || !content) {
      return { success: false, msg: 'Missing required fields' };
      
    }

    const chatroom: ChatRoom | null = await ChatRoom.findOne({ where: { ChatRoomID : chatroomName.ChatRoomID} });

    if (!chatroom) {
      console.log("chatroom not found");
      return { success: false, msg: 'Chat room not found' };
    }
    const user = await User.findOne({ where: { Username:sender.Username } });

    if (!user) {
      console.log("user not found");
      return { success: false, msg: 'User not found' };
    }

    const newMessage = new Message();
    newMessage.Content = content;
    newMessage.chatRoom = chatroom;
    newMessage.user = user;

        const savedMessage = await Message.save(newMessage);
        console.log({msg:"message sent successfully",message:savedMessage});

        console.log('The chat room created successfully, and the message was sent.');

    // You can return some success response here if needed
    return { success: true, msg: 'Chat room created and message sent' };
  } catch (error:any) {
    console.error(error);
    return { success: false, msg: 'Error', error: error.message };
  }
}