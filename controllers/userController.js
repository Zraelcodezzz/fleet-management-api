import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKeyHere';

const UserController = {
  // Register a new user
  async registerUser(userData) {
    const { username, email, password } = userData;

    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      const error = new Error('Email is already registered');
      error.statusCode = 400;
      throw error;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    }; // Return only safe user details (no password)
  },

  // Login user and return JWT token
  async loginUser(userData) {
    const { email, password } = userData;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role }, // Include necessary info
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    return token;
  },

  // Get user by ID (usually authenticated user)
  async getUserById(userId) {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email'], // Exclude password
    });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    return user;
  },

  // Update user details
  async updateUser(userId, userData) {
    const { username, email, password } = userData;

    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    // Update user fields only if they are provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      user.password = await bcrypt.hash(password, 10); // Hash the new password
    }

    await user.save();

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
};

export default UserController;
