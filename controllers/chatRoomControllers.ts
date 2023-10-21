import { ChatRoom } from '../dataBase/entities/Chatroom.js';
import express from 'express';
import { User } from '../dataBase/entities/User.js';

export const authorization = async (req: express.Request, res: express.Response) => {
    const Name = req.body.Name;
    const user = req.cookies['Username']; // Initialize user as an empty array

    try {

        const Username: any = await User.findOne({ where: { Username: user } });
        
        // Create a new chat room
        const newChatRoom = new ChatRoom();
        newChatRoom.Name = Name;
        
        // Convert 'Username' to an array before assigning it to 'user'
        newChatRoom.user = [Username];
        
        await ChatRoom.save(newChatRoom);

        // Return a success message
        return res.status(200).json({ message: `ChatRoom ${Name} created successfully` });
    } catch (error) {
        console.error("Error creating chat room:", error);

        // Handle the error and return an error message
        return res.status(500).json({ message: "Error creating ChatRoom" });
    }
};
