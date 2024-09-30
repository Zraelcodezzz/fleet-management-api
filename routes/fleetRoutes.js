import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { getFleets, addFleet, updateFleet, deleteFleet } from '../controllers/fleetController.js';

const router = express.Router();

router.get('/', authenticate, getFleets);
router.post('/', authenticate, addFleet);
router.put('/:id', authenticate, updateFleet);
router.delete('/:id', authenticate, deleteFleet);

export default router;
