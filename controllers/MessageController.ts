import { Message } from "../dataBase/entities/Message.js"





import { getRepository } from 'typeorm';

export const sendMessage = async (senderID: any, content: any) => {
  try {
  

    // Create a new message object
    const newMess = new Message();
    newMess.SenderUserId = senderID;
    newMess.Content = content;
    

    // Save the new message to the database
        await newMess.save();

    // Return a status indicating success
    return {
      from :senderID,
      text : content ,
      createdAt : Date.now()
    };
  } catch (error:any) {
    // Handle any errors that might occur during the database operation
    console.error('Error sending message:', error);

    // Return a status indicating failure
    return { status: 'Message sending failed', error: error.message };
  }
};
