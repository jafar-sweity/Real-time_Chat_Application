import { User } from '../dataBase/entities/User.js';
import {isEmail} from 'class-validator';
import { ChatRoom } from '../dataBase/entities/Chatroom.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express' 
import { Message } from '../dataBase/entities/Message.js';

export const authorization= async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
   const name = req.body;
   
    const nameRegex = /^[a-zA-Z0-9]+$/; // 
    if(!nameRegex.test(req.body.name)){
        return res.status(400).json({message:"Name can contain only letters and numbers"});
    }

    const chatRoomExists = await ChatRoom.findOne({where:{Name:name}});
    if(chatRoomExists){
        return res.status(400).json({message:"ChatRoom already exists"});
    } 

 

    const newChatRoom = new ChatRoom();
    newChatRoom.Name = name;
    await newChatRoom.save();

    res.json({ message: `ChatRoom ${name} created successfully`});
}
  
   
    
