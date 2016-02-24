'use strict';
module.exports = function(sequelize, DataTypes) {
  var plantsTags = sequelize.define('plantsTags', {
    plantId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return plantsTags;
};