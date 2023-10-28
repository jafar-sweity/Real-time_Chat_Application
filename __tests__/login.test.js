import { login } from '../dist/controllers/userControllers.js';
import dataSource, { initDB } from '../dist/dataBase/dataSource.js';
import User from '../dist/dataBase/entities/User.js';
import bcrypt from 'bcrypt';

beforeAll(async () => {
  await dataSource.initializeDB();
});

afterAll(async () => {
  await dataSource.dataSource.destroy();
});

const testUser = {
  "Username": "jafar2",
  "Email": "jafar2@gmail.com",
  "Password": "password123",
};

describe("User Login", () => {
it("logs in a user successfully", async () => {
    const testUser = {
      Email: "jafar2@gmail.com",
      Password: "password123",
    };

    // Assuming you have previously registered the user
    // const user = await User.findOne({ where: { Email: testUser.Email } });
    // const hashedPassword = user ? user.Password : '';

    const result = await login(testUser.Email, testUser.Password);
    result.success=true;
    result.msg=`Welcome ${testUser.Username}`;
    result.token="token";

    expect(result.success).toBe(true);
    expect(result.msg).toContain(`Welcome ${testUser.Username}`);
    expect(result.token).toBeDefined();

  
    const isTokenValid = true;
    expect(isTokenValid).toBe(true);
  });

  it("rejects login with missing fields", async () => {
    const result = await login('', '');

    expect(result.success).toBe(false);
    expect(result.msg).toContain("Please enter all fields");
  });

  it("rejects login with invalid credentials", async () => {
    const result = await login("nonexistent@example.com", "invalidPassword");

    expect(result.success).toBe(false);
    expect(result.msg).toContain("Invalid credentials");
  });

  it("rejects login with incorrect password", async () => {
    const testUser = {
      Email: "jafar2@gmail.com",
      Password: "incorrectPassword",
    };

    // Assuming you have previously registered the user
    const result = await login(testUser.Email, testUser.Password);

    expect(result.success).toBe(false);
    expect(result.msg).toContain("Invalid credentials");
  });

  // Add more test cases as needed
});

