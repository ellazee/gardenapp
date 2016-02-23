'use strict';
module.exports = function(sequelize, DataTypes) {
  var month = sequelize.define('month', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return month;
};