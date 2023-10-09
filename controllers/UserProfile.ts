import express from 'express'
import {User} from '../dataBase/entities/User.js'
import { Repository } from 'typeorm';
import { error } from 'console';

export const EditUserProfile = async(Username:string)=>{
        const user:any =await User.findOne({where : {Username : Username}});
        const newUser = new User();
        user.equals(newUser);

        await user.save().then(()=>{
            console.log({msg: "changed user successfuly"})
        }).catch((error: any)=>{
            console.log(`there is an error ${error}`)
        })

    
}

