import bodyParser from 'body-parser';
import { authorization } from '../controllers/chatRoomControllers.js';
import express from 'express'
import { User } from '../dataBase/entities/User.js';
const router = express.Router();
router.use(bodyParser.urlencoded({extended: true})) 
router.use(bodyParser.json()) 
router.post('/create', async (req, res) => {
    try {
      const Name = req.body.Name;
      const username  = req.body.Username;
      const user:any =await User.findOne({where: {Username:username}});
      console.log(Name);
      if (Name) {
        const data = await authorization(Name,user); // Add await here
        
        res.status(200).json({ message: 'Authorization successful', data });
      } else {
        res.status(400).json({ message: 'Missing required field: Name' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

export default router;
