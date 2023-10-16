const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Game = sequelize.define('Game', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      description: 'Primary key for game',
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      description: 'Name of the game',
    },
    description: {
      type: DataTypes.TEXT,
      description: 'Description of the game',
    },
    image: {
      type: DataTypes.INTEGER,
      allowNull: true,
      description: 'Foreign key referencing files(id)',
    },
    estimated_time: {
      type: DataTypes.STRING(30),
      allowNull: true,
      description: 'Estimated time to finish the game',
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  return Game;
};
