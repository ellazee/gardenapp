'use strict';
module.exports = function(sequelize, DataTypes) {
  var image = sequelize.define('image', {
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    text: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.image.belongsTo(models.user);
      }
    }
  });
  return image;
};