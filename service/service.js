import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';  // Import the User model
import { Op } from 'sequelize';

// Constants
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use a secure key in production
const JWT_EXPIRES_IN = '1h'; // Token expiration time

class UserService {
  // Register a new user
  async registerUser(email, password, role) {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Create a new user
      const user = await User.create({
        email,
        password: hashedPassword,
        role
      });
      
      return user;
    } catch (error) {
      throw new Error('Error registering user: ' + error.message);
    }
  }

  // Login a user
  async loginUser(email, password) {
    try {
      // Find the user by email
      const user = await User.findOne({ where: { email } });
      
      if (!user) {
        throw new Error('User not found');
      }
      
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }
      
      // Create JWT token
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
      });
      
      return { token, user };
    } catch (error) {
      throw new Error('Error logging in: ' + error.message);
    }
  }

  // Verify a token
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  // Get user by ID
  async getUserById(id) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }

  // Check if user has a specific role
  async checkUserRole(userId, role) {
    try {
      const user = await this.getUserById(userId);
      return user.role === role;
    } catch (error) {
      throw new Error('Error checking user role: ' + error.message);
    }
  }

  // Update user information
  async updateUser(id, updateData) {
    try {
      // Find and update the user
      const [updated] = await User.update(updateData, {
        where: { id }
      });
      return updated;
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }

  // Delete a user
  async deleteUser(id) {
    try {
      const deleted = await User.destroy({
        where: { id }
      });
      return deleted;
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }
}

export default new UserService();
