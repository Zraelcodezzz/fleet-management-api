import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// Import routes
import userRoutes from './routes/userRoutes.js'; // User registration, login
import fleetRoutes from './routes/fleetRoutes.js'; // Fleet management
import destinationRoutes from './routes/destinationRoutes.js'; // Destination management
import journeyRoutes from './routes/journeyRoutes.js'; // Journey management
import ticketRoutes from './routes/ticketRoutes.js'; // Ticket booking
import reportRoutes from './routes/reportRoutes.js'; // Report management

// Import middleware
import authMiddleware from './middlewares/authMiddleware.js'; // JWT authentication middleware
import errorHandler from './middlewares/errorHandler.js'; // Custom error handling middleware

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Cross-origin resource sharing
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Fleet Management API');
});

// Public routes (no authentication required)
app.use('/api/users', userRoutes); // User management (registration, login)

// Protected routes (authentication required)
app.use('/api/fleet', authMiddleware, fleetRoutes); // Fleet management
app.use('/api/destinations', authMiddleware, destinationRoutes); // Destination management
app.use('/api/journeys', authMiddleware, journeyRoutes); // Journey management
app.use('/api/tickets', authMiddleware, ticketRoutes); // Ticket booking
app.use('/api/reports', authMiddleware, reportRoutes); // Report management
app.use('/api/finance', authMiddleware, financeRoutes); // Financial management

// Error handling middleware
app.use(errorHandler); // Custom error handling middleware

export default app;
