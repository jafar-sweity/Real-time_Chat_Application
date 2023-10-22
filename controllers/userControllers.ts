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
    export const login = async (req:express.Request, res:express.Response) => {
      const email = req.body.Email;
      const password = req.body.Password;
    
      try {
        if (!email || !password) {
          return res.status(400).json({ success: false, msg: 'Please enter all fields' });
        }
    
        const user = await User.findOne({ where: { Email: email } });
        if (!user) {
          return res.status(401).json({ success: false, msg: 'Invalid credentials' });
        }
    
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
          console.log('Password does not match');
          return res.status(401).json({ success: false, msg: 'Invalid credentials' });
        }
    
    
        const token = jwt.sign({ email: user.Email }, process.env.JWT_SECRET || '', {
          expiresIn: '30m',
        });
    
        await user.save();
    
        res.cookie('Username', user.Username, {
          maxAge: 60 * 60 * 1000
        });
    
        res.cookie('token', token, {
          maxAge: 60 * 60 * 1000
        });
    
        return res.status(200).json({ success: true, token, user: user.Username });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
      }
    };
    



      export const deleteUser = async (Username: string) => {
  try {
    const user:any = await User.findOne({ where: { Username: Username } });
    
    if (!user) {
      return { success: false, msg: 'User does not exist' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, msg: 'Internal server error' };
  }
};





export const logout = async (req:express.Request, res:express.Response) => {
  const username = req.cookies['Username'];
  if (!username) {
    res.status(401).json({ message: 'You must login' });
    return;
  }

  // Clear the OnlineStatus for the user
  const user = await User.findOne({ where: { Username: username } });
  if (!user) {
    res.status(401).json({ message: 'User not found' });
    return;
  }

  

  // Clear the cookies
  res.clearCookie('Username');
  res.clearCookie('token');

  // If using sessions, destroy the session
  if (req.session) {
    req.session.destroy((err) => {
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



