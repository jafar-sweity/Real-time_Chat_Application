import express from 'express';
import multer from 'multer';
import fs from 'fs';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import { Attachment } from '../dataBase/entities/Attachment.js';
import { Message } from '../dataBase/entities/Message.js';
import { User } from '../dataBase/entities/User.js';

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

const s3 = new AWS.S3();

const uploadToS3 = (file:any, bucketName:any) => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(file.path);

    const params = {
      Bucket: bucketName,
      Body: fileStream,
      Key: file.filename,
    };

     s3.putObject(params, (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const uploadAttachment = async (req: express.Request, res: express.Response) => {
  try {
    if (!req.cookies['Username']) {
      return res.status(401).json({ message: 'You must log in!' });
    }

    const username = req.cookies['Username'];
    const user = await User.findOne({ where: { Username: username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!req.body.Content) {
      return res.status(400).json({ message: 'You must enter the content' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'You must upload a file' });
    }

    const fileToUpload = fs.readFileSync(req.file.path);
    const encodedFile = fileToUpload.toString('base64');
    const file = Buffer.from(encodedFile, 'base64');

    const attachment = new Attachment();
    attachment.Attachment = file;
    await attachment.save();

    const message = new Message();
    message.attachment = attachment;
    message.Content = req.body.Content;
    await message.save();

    const bucketName = process.env.AWS_BUCKET_NAME;

    // Call the uploadToS3 function to upload the file to S3
    await uploadToS3(req.file, bucketName);

    res.status(201).json({ message: 'Attachment uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload the attachment' });
  }
};

export default uploadAttachment;
