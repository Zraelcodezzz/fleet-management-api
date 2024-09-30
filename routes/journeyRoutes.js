// routes/journeyRoutes.js
import express from 'express';
import {
  createJourney,
  getJourneys,
  getJourneyById,
  updateJourney,
  deleteJourney,
} from '../controllers/journeyController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js'; // Assuming you have JWT-based authentication middleware

const router = express.Router();

// Routes for journeys (admin only for create, update, delete)
router.post('/', protect, isAdmin, createJourney);
router.get('/', protect, getJourneys);
router.get('/:id', protect, getJourneyById);
router.put('/:id', protect, isAdmin, updateJourney);
router.delete('/:id', protect, isAdmin, deleteJourney);

export default router;
