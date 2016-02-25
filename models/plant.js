'use strict';
module.exports = function(sequelize, DataTypes) {
  var plant = sequelize.define('plant', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    info: DataTypes.TEXT,
    category: DataTypes.STRING,
    S1: DataTypes.INTEGER,
    H1: DataTypes.INTEGER,
    S2: DataTypes.INTEGER,
    H2: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.plant.belongsToMany(models.tag, {through: 'plantsTags'});
        models.plant.belongsToMany(models.user, {through: 'usersPlants'});
//        models.plant.belongsTo(models.month, {as:'firstsow', foreignKey: 'S1'});
//        models.plant.belongsTo(models.month, {as:'firstharvest', foreignKey: 'H1'});
      }
    }
  });
  return plant;
};