import express from 'express';
import { User } from '../dataBase/entities/User.js';
import { updateUserProfile } from '../controllers/UserProfile.js';

const app = express.Router();



export default app.post('/modifyProfile',(req,res)=>{
    const UsernameOld = req.cookies['Username'];
    const Username = req.body.Username;
    const Password = req.body.Password;
    const Email = req.body.Email;
    const UserData= {
        Username:Username,
        Password:Password,
        Email:Email
    }

      User.find({where: {Username: UsernameOld}}).then(()=>{

          updateUserProfile(UsernameOld,UserData)
          console.log('the user updated succefully')
      }).catch(
            (error)=>{
                console.log(error);
            }
            
       )


    })