import { User } from '../dataBase/entities/User.js';
import {isEmail} from 'class-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express';


export const registerUser = async (Username:string, email:string, password:string) => {
  try {
    const regexEmail = /[@gmail.com|@yahoo.com|@hotmail.com|@live.com|@outlook.com|@cloud.com]$/;

    if (!regexEmail.test(email) && !isEmail(email)) {
      return { success: false, msg: 'Invalid email' };
    }

    if (!Username || !email || !password) {
      return { success: false, msg: 'Please enter all fields' };
    }

    if (Username.length < 3 || Username.length > 20) {
      return { success: false, msg: 'Username must be between 3 and 20 characters' };
    }


    const isExist = await User.findOne({ where: { Email: email } });
    if (isExist) {
      return { success: false, msg: 'User already exists' };
    }

    if (password.length < 8 || password.length > 20) {
      return { success: false, msg: 'Password must be between 8 and 20 characters' };
    }

    const newUser = new User();
    newUser.Username = Username;
    newUser.Email = email;
    newUser.Password = password;

    await newUser.save();
    return { success: true, msg: `User ${Username} created successfully` };
  } catch (error) {
    console.error(error);
    return { success: false, msg: 'Internal server error' };
  }
};



    
    // Login Function
    export const login = async (email: string, password: string) => {
        try {
          if (!email || !password) {
            return { success: false, msg: 'Please enter all fields' };
          }
      
          const user = await User.findOne({ where: { Email: email } });
          if (!user) {
            return { success: false, msg: 'User does not exist' };
          }
      
          // Compare the provided plaintext password with the stored encrypted password
          const isMatch = await bcrypt.compare(password, user.Password);
          if (!isMatch) {
            return { success: false, msg: 'Invalid credentials' };
          }
      
          // Notify other users that this user is online
         
      
          const token = jwt.sign({ email: user.Email }, process.env.JWT_SECRET || '', {
            expiresIn: '30m',
          });
      
          return { success: true, token, user: user.Username  };
        } catch (error) {
          console.error(error);
          return { success: false, msg: 'Internal server error' };
        }
      };
    



      export const deleteUser = async (Username: string) => {
  try {
    const user = await User.findOne({ where: { Username: Username } });

    if (user) {
      await user.remove();
      return { success: true };
    } else {
      return { success: false, msg: 'User not found' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, msg: 'Internal server error' };
  }
};




export const logout = async (req:express.Request,res:express.Response) => {

  //     req.session.destroy((err) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).json({ message: 'Server error' });
  //   } else {
  //     res.clearCookie("sid"); // clear cookie session id 

  //     res.status(200).json({ message: 'User logged out successfully' });    
  //   }
  // });

    res.cookie('userName', '', {
    maxAge: -1,  // This means the cookie will be deleted
    expires: new Date(Date.now() - 1000)
  });
   res.cookie('token', '', {
    maxAge: -1
  });
  res.status(200).json({ message: 'User logged out successfully' });
}