const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const File = sequelize.define('File', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    mime_type: {
      type: DataTypes.STRING(30),
    },
    content: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'FileContent', // Name of the referenced model
        key: 'id',            // Primary key of the referenced model
      },
    },
  });

  return File;
};
