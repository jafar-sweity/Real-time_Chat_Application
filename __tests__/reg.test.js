import { login } from '../dist/controllers/userControllers.js';
import User from '../dist/dataBase/entities/User.js';
import { config } from 'dotenv';
config();
import jwt from 'jsonwebtoken';
import '../jest.config.json';
import dataSource, { initDB } from '../dist/dataBase/dataSource.js';
import { registerUser } from "../dist/controllers/userControllers.js";

beforeAll(async () => {
  await dataSource.initializeDB();
});

afterAll(async () => {
  await dataSource.dataSource.destroy();
});

const testUser = {
  "Username": "jafar2",
  "Email": "jafar2@gmail.com",
  "password": "password123"
};

describe("User Registration", () => {
  let result;

  beforeAll(async () => {
    result = await registerUser(testUser.Username, testUser.Email, testUser.password);
    
  });
  
  it("registers a user successfully", () => {
     expect(result.msg).toContain(`User ${testUser.Username} created successfully`);
    expect(result.success).toBe(true);
   
  });

  it("rejects registration with an invalid email", async () => {
    const invalidEmailResult = await registerUser(testUser.Username, "invalid-email", testUser.password);
    expect(invalidEmailResult.msg).toContain("Invalid email");
    expect(invalidEmailResult.success).toBe(false);
  });

  it("rejects registration with an existing email", async () => {
    const duplicateEmailResult = await registerUser(testUser.Username, testUser.Email, testUser.password);
    expect(duplicateEmailResult.success).toBe(false);
    expect(duplicateEmailResult.msg).toContain("User already exists");
  });

  it("rejects registration with a short password", async () => {
    const shortPasswordResult = await registerUser(testUser.Username, "another-email@example.com", "123");
    expect(shortPasswordResult.success).toBe(false);
    expect(shortPasswordResult.msg).toContain("Password must be between 8 and 20 characters");
  });

  // Add more test cases as needed
});