import { User } from '../dataBase/entities/User.js';
import {isEmail} from 'class-validator';
import { ChatRoom } from '../dataBase/entities/Chatroom.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express' 
import { Message } from '../dataBase/entities/Message.js';

export const authorization= async (Name:string)=>{
  
   


   
        const newChatRoom = new ChatRoom();
        newChatRoom.Name = Name;
        await newChatRoom.save();
    
       return ({ message: `ChatRoom ${Name} created successfully`});


 

       
   
}
  
   
    
 
