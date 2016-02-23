'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('plants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      info: {
        type: Sequelize.TEXT
      },
      category: {
        type: Sequelize.STRING
      },
      S1: {
        type: Sequelize.INTEGER
      },
      H1: {
        type: Sequelize.INTEGER
      },
      S2: {
        type: Sequelize.INTEGER
      },
      H2: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('plants');
  }
};