const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // your database connection

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('open', 'in_progress', 'closed'),
    allowNull: false,
    defaultValue: 'open',
  },
  assignedTo: {
    type: DataTypes.STRING,
    allowNull: true, // you can make this not null if you want to assign a ticket right away
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Sync the model with the database (this will create the table if it doesn't exist)
Ticket.sync({ alter: true });

module.exports = Ticket;
