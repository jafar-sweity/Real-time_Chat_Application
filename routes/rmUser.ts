import express from 'express'
import login from './login.js'
import { deleteUser } from '../controllers/userControllers.js';

const route = express();

 route.delete ('/delete-USR', (req,res)=>{
    const username = req.body.username;

    deleteUser(username).then(()=>{
        console.log('the user delete succefully')
    }).catch((error)=>{
        console.log(`there is an error : ${error}`);
        
    })
})

export default route;