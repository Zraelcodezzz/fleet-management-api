import express from 'express';
import { connectDB } from '../config/db'; 
import errorHandler from './middleware/errorHandler.js'; // Import the error handler

const app = express();
const port = process.env.PORT || 3000; 

// Call connectDB to ensure the database is connected
connectDB();

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to Fleet Management API');
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
