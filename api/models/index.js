const { DataTypes } = require('sequelize');

// Import your Sequelize models
const sequelize = require('../db/db'); // Import your Sequelize connection
const Game = require('./game')(sequelize);
const Tag = require('./tag')(sequelize);
const FaultType = require('./fault_type')(sequelize);
const FileContent = require('./files_content')(sequelize);
const File = require('./files')(sequelize);
const GameTag = require('./game_tag')(sequelize);
const Fault = require('./fault')(sequelize);

// Define associations if needed (e.g., foreign keys)
Game.belongsToMany(Tag, { through: GameTag });
Tag.belongsToMany(Game, { through: GameTag });
Fault.belongsTo(FaultType, { foreignKey: 'fault_type_id' });
Fault.belongsTo(File, { foreignKey: 'image' });

// Export all the models
module.exports = {
  Game,
  Tag,
  FaultType,
  FileContent,
  File,
  GameTag,
  Fault,
};
