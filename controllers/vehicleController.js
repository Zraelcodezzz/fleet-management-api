
import Vehicle from '../models/vehicleModel.js';

// Create a new vehicle
const createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: 'Error creating vehicle', error });
  }
};

// Get all vehicles
const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error });
  }
};

// Get a vehicle by ID
const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (vehicle) {
      res.status(200).json(vehicle);
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicle', error });
  }
};

// Update a vehicle by ID
const updateVehicle = async (req, res) => {
  try {
    const [updated] = await Vehicle.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated) {
      const updatedVehicle = await Vehicle.findByPk(req.params.id);
      res.status(200).json(updatedVehicle);
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating vehicle', error });
  }
};

// Delete a vehicle by ID
const deleteVehicle = async (req, res) => {
  try {
    const deleted = await Vehicle.destroy({
      where: { id: req.params.id },
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle', error });
  }
};

export {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
