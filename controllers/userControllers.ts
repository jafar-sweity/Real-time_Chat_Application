import { User } from '../dataBase/entities/User.js';
import {isEmail} from 'class-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Request,Response} from 'express';


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
    export const login = async (email: string, password: string,onlinestatus:boolean) => {
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
          user.OnlineStatus= onlinestatus;
          user.save();
      
          return { success: true, token, user: user.Username  };
        } catch (error) {
          console.error(error);
          return { success: false, msg: 'Internal server error' };
        }
      };
    



      export const deleteUser = async (Username: string) => {
  try {
    const user:any = await User.findOne({ where: { Username: Username } });
    
    if (user.OnlineStatus===true) {
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




export const logout = (req:Request, res:Response) => {
  // Clear the cookies
  res.clearCookie('Username');
  res.clearCookie('token');

  // If using sessions, destroy the session
  if (req.session) {
    req.session.destroy((err:any) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).json({ message: 'Server error' });
      } else {
        res.status(200).json({ message: 'User logged out successfully' });
      }
    });
  } else {
    // If not using sessions, you can just respond with success
    res.status(200).json({ message: 'User logged out successfully' });
  }
};



