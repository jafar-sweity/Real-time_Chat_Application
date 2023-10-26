import expres from 'express';
import multer from 'multer';
import { Attachment } from '../dataBase/entities/Attachment.js';
import { Message } from '../dataBase/entities/Message.js';
import { User } from '../dataBase/entities/User.js';
import fs from 'fs';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';



export const uploadAttachment = async (req: expres.Request, res: expres.Response) => {
  try {
    if (!req.cookies['Username']) {
      return res.status(401).json({ message: 'You must log in!' });
    }
    const username = req.cookies['Username'];
    

    const user = await User.findOne({ where: { Username: username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!req.body.content) {
      return res.status(400).json({ message: 'You must enter the content' });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'You must upload a file' });
    }
   
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    
    const fileToUpload = fs.readFileSync(req.file.path); // Correct variable name
    const objectKey = uuidv4();
    const params = {
      
      Key: objectKey,
      Body: fileToUpload, 
    };
   const Bucket:any= process.env.AWS_BUCKET_NAME;
    
    if (!params.Key) {
      return res.status(400).json({ message: 'You must provide a key for the object' });
    }
    s3.upload({Bucket:Bucket,Key:params.Key,Body:params.Body}, async (err: any, data: any) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to upload the attachment' });
      }
    
      const attachment = new Attachment();
      attachment.objectKey = objectKey;
      await attachment.save();
    
    
      const message = new Message();
      message.attachment = attachment;
      message.Content = req.body.Content;
      await message.save();

      res.status(201).json({ message: 'Attachment uploaded successfully' });
    });
    
    //fetch the object key from s3 and save it in the database

    res.status(201).json({ message: 'Attachment uploaded successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload the attachment' });
  }
};

export default uploadAttachment;


