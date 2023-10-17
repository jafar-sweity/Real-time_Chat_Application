import { Attachment } from "../dataBase/entities/Attachment.js";
import { ChatRoom } from "../dataBase/entities/Chatroom.js";
import { Message } from "../dataBase/entities/Message.js"
import { User } from "../dataBase/entities/User.js";
import { login } from "./userControllers.js";

export const sendMessage = async (user:User,content:string,chatroomName:string, attach:Attachment) => {
  try {
    


    const searchOnChat:any = ChatRoom.find({where: {Name:chatroomName}});
    // Create a new message object
    let newMess = new Message();
    let attachment = new Attachment();
    attachment = attach;
    attachment.save()
    newMess.user = user;
    newMess.Content = content;
    newMess.ChatRoomID = searchOnChat.ChatRoomID;
    newMess.attachment = attachment; 



    // Save the new message to the database
        await newMess.save();

    // Return a status indicating success
    return {
      from :newMess.user||'firas',
      text : newMess.Content ,
      createdAt : newMess.Timestamp,
      attachment: newMess.attachment,
      chatRoom:newMess.ChatRoomID,

    };
  } catch (error:any) {
    // Handle any errors that might occur during the database operation
    console.error('Error sending message:', error);

    // Return a status indicating failure
    return { status: 'Message sending failed', error: error.message };
  }
};
