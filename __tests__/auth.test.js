import { login } from '../dist/controllers/userControllers.js';
import User from '../models/User.js';
import { config } from 'dotenv';
config();
import jwt from 'jsonwebtoken';
import '../jest.config.json';
describe('Login', () => {
  it('should return a token', async () => {

     const email= 'jafar@gmail.com'// user email  registered in the database
     const password='jafar'// user username registered in the database
    const response = await login(email, password);
    expect(response).toHaveProperty('token');
    }); 
});
