const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Fault = sequelize.define('Fault', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      description: 'Primary key for fault',
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      description: 'Name of the fault',
    },
    description: {
      type: DataTypes.TEXT,
      description: 'Description of the fault',
    },
    solution: {
      type: DataTypes.TEXT,
      description: 'Solution for the fault',
    },
    fault_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      description: 'Foreign key referencing fault_type(id)',
    },
    image: {
      type: DataTypes.INTEGER,
      allowNull: true,
      description: 'Foreign key referencing files(id)',
    },
  });

  // Define associations for foreign keys
  Fault.belongsTo(FaultType, {
    foreignKey: 'fault_type_id',
    as: 'faultType',
  });


  return Fault;
};
