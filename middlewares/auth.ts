import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../dataBase/entities/User.js';

const authenticate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers['authorization'] || req.cookies['token'] || '';  
  let tokenIsValid;
  try {
    tokenIsValid = jwt.verify(token, process.env.SECRET_KEY || '');
    
  } catch (error) { 
    res.status(401).send("You are Unauthorized!");
  }

  if (tokenIsValid) {
    const decoded = jwt.decode(token, { json: true });
    const user = await User.findOneBy({ Email: decoded?.email || '' })
    res.locals.user = user;
    next();
  } else {
    res.status(401).send("You are Unauthorized!");
  }
}

export {
  authenticate
}