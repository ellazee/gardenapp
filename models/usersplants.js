'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersPlants = sequelize.define('usersPlants', {
    userId: DataTypes.INTEGER,
    plantId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersPlants;
};