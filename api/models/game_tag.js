const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const GameTag = sequelize.define('GameTag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Game', // Name of the referenced model (Assuming you have a "Game" model)
        key: 'id',      // Primary key of the referenced model
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tag',  // Name of the referenced model (Assuming you have a "Tag" model)
        key: 'id',      // Primary key of the referenced model
      },
    },
  });

  return GameTag;
};
