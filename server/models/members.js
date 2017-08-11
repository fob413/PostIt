module.exports = (sequelize, DataTypes) => {
  const Members = sequelize.define('Members', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Members.belongsTo(models.Groups, {foreignKey: 'groupId'})
      }
    }
  });
  return Members;
};
