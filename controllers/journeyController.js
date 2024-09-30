// controllers/vehicleController.js
import Vehicle from '../models/vehicleModel.js'; // Your vehicle model

class VehicleController {
  static async createVehicle(vehicleData) {
    const vehicle = await Vehicle.create(vehicleData);
    return vehicle;
  }

  static async getAllVehicles() {
    const vehicles = await Vehicle.findAll();
    return vehicles;
  }

  static async getVehicleById(vehicleId) {
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) throw new Error('Vehicle not found');
    return vehicle;
  }

  static async updateVehicle(vehicleId, vehicleData) {
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) throw new Error('Vehicle not found');
    await vehicle.update(vehicleData);
    return vehicle;
  }

  static async deleteVehicle(vehicleId) {
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) throw new Error('Vehicle not found');
    await vehicle.destroy();
  }
}

export default VehicleController;
