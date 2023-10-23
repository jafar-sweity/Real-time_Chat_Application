import multer  from 'multer';
import express from 'express';
import { uploadAttachment } from '../controllers/AttachmentController.js';
import { Attachment } from '../dataBase/entities/Attachment.js';

const router = express.Router();
router.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });
router.post('/uploadAttachment', upload.single('file'), uploadAttachment);


export default router;