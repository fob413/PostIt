'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.createTable('Groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      GroupName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      Description: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
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
  down: function down(queryInterface) {
    queryInterface.dropTable('Groups');
  }
};