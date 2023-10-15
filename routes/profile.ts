import express from 'express'
import { User } from '../dataBase/entities/User.js';

const app = express.Router();


 app.get('/userProfile',(req,res)=>{
    const Username = req.body.Username;

    User.find({where : {Username:Username}}).then((user)=>{
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).send('user not found');
    }

    }).catch((error)=>{
            res.status(500).json({message : 'internal server error!'})
    })
})

export default app;

