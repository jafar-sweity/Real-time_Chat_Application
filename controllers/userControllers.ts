import express from 'express';
import { User } from '../dataBase/entities/User.js';
import  isEmail  from 'validator/lib/isEmail.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const registerUser = async (req: express.Request, res: express.Response,next:express.NextFunction) => {

const {Username,email,password}=req.body

const regexEmail=/[@gmail.com|@yahoo.com|@hotmail.com|@live.com|@outlook.com|@cloud.com]$/
if(!regexEmail.test(email)&&!isEmail.default(email)){
    return res.status(400).json({msg:"invalid email"})
}

if(!Username||!email||!password){
    return res.status(400).json({msg:"please enter all fields"})
}

if(Username.length<3 && Username.length>20){
    return res.status(400).json({msg:"username must be at least 3 characters"})
}

const isExist = await User.findOne({where:{Email:email}});
if(isExist){
    res.status(400).json({msg:"user already exists"})
}

if(password.length<8 && password.length>20){
    return res.status(400).json({msg:"password must be at least 8 characters"})
}
const newUser = new User();
newUser.Username=Username;
newUser.Email=email;
newUser.Password=password;

try {
    await newUser.save();
    return res.status(201).json({msg:`user ${Username}created successfully`})
}catch (error) {
    console.log(error);
    return res.status(500).json({msg:"internal server error"})
}

const loginUser = async (req: express.Request, res: express.Response) => {  
    
    const [email,password]=req.body;
    
    if(!email||!password){
        return res.status(400).json({msg:"please enter all fields"})
    }

    const user = await User.findOne({where:{Email:email}});
    if(!user){
        return res.status(400).json({msg:"user does not exist"})
    }

    const isMatch = await bcrypt.compare(password,user.Password);
    if(!isMatch){
        return res.status(400).json({msg:"invalid credentials"})
    }
    const token = jwt.sign({id:user.UserId,user:Username},process.env.JWT_SECRET||'',{
        expiresIn:"30m"
    });

    res.status(200).json({token,user:user.Username})



}




}