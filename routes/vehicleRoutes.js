import express from 'express';
import VehicleController from '../controllers/vehicleController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Middleware to ensure only authenticated users can access these routes
router.use(authenticate);

// Route to create a new vehicle (Admin only)
router.post('/', async (req, res) => {
  try {
    const vehicle = await VehicleController.createVehicle(req.body);
    res.status(201).json({ message: 'Vehicle created successfully', vehicle });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

// Route to get all vehicles (Admin only)
router.get('/', async (req, res) => {
  try {
    const vehicles = await VehicleController.getAllVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

// Route to get a specific vehicle by ID (Admin only)
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await VehicleController.getVehicleById(req.params.id);
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

// Route to update a vehicle by ID (Admin only)
router.patch('/:id', async (req, res) => {
  try {
    const vehicle = await VehicleController.updateVehicle(req.params.id, req.body);
    res.status(200).json({ message: 'Vehicle updated successfully', vehicle });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

// Route to delete a vehicle by ID (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    await VehicleController.deleteVehicle(req.params.id);
    res.status(204).send(); // No content to return
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

export default router;
