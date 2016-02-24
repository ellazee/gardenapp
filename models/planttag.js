'use strict';
module.exports = function(sequelize, DataTypes) {
  var plantTag = sequelize.define('plantTag', {
    tag: DataTypes.STRING,
    plantId: DataTypes.INTEGER,
    favoriteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return plantTag;
};