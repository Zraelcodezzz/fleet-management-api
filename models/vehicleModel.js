import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Your database connection

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  plateNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'in_maintenance', 'retired'),
    defaultValue: 'active',
    allowNull: false,
  },
  assignedDriverId: {
    type: DataTypes.UUID,
    allowNull: true, // Optional field
  },
}, {
  timestamps: true,
});

export default Vehicle;
