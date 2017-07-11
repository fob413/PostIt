module.exports = (sequelize, DataTypes) => {
  const Members = sequelize.define('Members', {
    allowNull: DataTypes.FALSE
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return Members;
};