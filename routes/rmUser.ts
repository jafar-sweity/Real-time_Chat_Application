import express from 'express'
import login from './login.js'
import { deleteUser } from '../controllers/userControllers.js';

const route = express.Router();

 route.delete ('/deleteUSR', (req,res)=>{
    const username = req.cookies['Username'];
    if (!username){
        console.log({message : "you must login!"})
    }
    
    deleteUser(username).then(()=>{
        console.log('the user delete succefully')
    }).catch((error)=>{
        console.log(`there is an error : ${error}`);
        
    })
})

export default route;