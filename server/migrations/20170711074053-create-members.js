module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      allowNull: {
        type: Sequelize.FALSE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      groupId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Groups',
          key: 'id',
        },
      },
    });
  },
  down: (queryInterface/*, Sequelize*/) => {
    queryInterface.dropTable('Members');
  }
};