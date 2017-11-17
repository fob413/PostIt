module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true,
        unique: true,
      },
      telephone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      resetPasswordToken: {
        type: Sequelize.STRING,
        allowNull: true
      },
      expiryTime: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isLoggedin: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
  down: (queryInterface /* , Sequelize */) => {
    queryInterface.dropTable('Users');
  }
};
