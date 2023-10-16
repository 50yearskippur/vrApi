const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const FaultType = sequelize.define('FaultType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });

  return FaultType;
};
