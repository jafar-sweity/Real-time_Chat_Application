import { Attachment } from "../dataBase/entities/Attachment.js";
import { Message } from "../dataBase/entities/Message.js"
import { login } from "./userControllers.js";

export const sendMessage = async (message:Message, attach:Attachment) => {
  try {
  

    // Create a new message object
    let newMess = new Message();
    let attachment = new Attachment();
    attachment = attach;
    attachment.save()
  
    newMess.attachment = attachment; 
    

    // Save the new message to the database
        await newMess.save();

    // Return a status indicating success
    return {
      from :newMess.user,
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
