import expres from 'express';
import multer from 'multer';
import { Attachment } from '../dataBase/entities/Attachment.js';
import { Message } from '../dataBase/entities/Message.js';
import { User } from '../dataBase/entities/User.js';
import fs from 'fs';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import S3 from 'aws-sdk/clients/s3.js';
import dotenv from 'dotenv';

dotenv.config();

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
    const fuleToUpload = fs.readFileSync(req.file.path);
    const encodedFile = fuleToUpload.toString('base64');
    const file = Buffer.from(encodedFile, 'base64');

    const attachment = new Attachment();

    attachment.Attachment = file;
    await attachment.save();

    const message = new Message();
    message.attachment = attachment;
    message.Content = req.body.Content; 
    await message.save();


    res.status(201).json({ message: 'Attachment uploaded successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload the attachment' });
  }
};


const upload_func =  (file:any) => {
  const fileStream = fs.createReadStream(file.path);

  const s3 = new S3({
    region: "eu-west-3",
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

  const Bucket = process.env.AWS_BUCKET_NAME;
  console.log(Bucket);
  

  if (!Bucket) {
    throw new Error('AWS_BUCKET_NAME is not defined');
  }
else {
  const uploadParams = {
    Bucket:"jafar-test" ,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}
}
export default uploadAttachment;



