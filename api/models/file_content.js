const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const FileContent = sequelize.define('FileContent', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.BLOB('long'), // Use BLOB data type for BYTEA
      allowNull: false,
    },
  });

  return FileContent;
};
