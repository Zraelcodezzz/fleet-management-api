import express from 'express';
import UserController from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js'; // Your authentication middleware

const router = express.Router();

// Route to register a new user
router.post('/register', async (req, res) => {
  try {
    const user = await UserController.registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

// Route to log in a user
router.post('/login', async (req, res) => {
  try {
    const token = await UserController.loginUser(req.body);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

// Middleware to ensure only authenticated users can access these routes
router.use(authenticate);

// Route to get the authenticated user's details
router.get('/me', async (req, res) => {
  try {
    const user = await UserController.getUserById(req.user.id); // Assuming `req.user.id` holds the authenticated user's ID
    res.status(200).json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

// Route to update the authenticated user's information
router.patch('/me', async (req, res) => {
  try {
    const user = await UserController.updateUser(req.user.id, req.body);
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

export default router;
