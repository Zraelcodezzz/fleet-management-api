import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Ensure you have your Sequelize instance setup here

const Journey = sequelize.define('Journey', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  vehicleId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  destinationId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  departureTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  availableSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'in_progress', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'scheduled'
  }
}, {
  tableName: 'journeys',
  timestamps: true // Adds createdAt and updatedAt fields
});

// Define associations if necessary
// For example, if you have associations with Vehicle and Destination models
// Journey.belongsTo(Vehicle, { foreignKey: 'vehicleId' });
// Journey.belongsTo(Destination, { foreignKey: 'destinationId' });

export default Journey;
