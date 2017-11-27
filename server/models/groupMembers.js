module.exports = (sequelize, DataTypes) => {
  const GroupMembers = sequelize.define('GroupMembers', {
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
        // associations
        GroupMembers.belongsTo(models.Groups, { foreignKey: 'groupId' });
        GroupMembers.belongsTo(models.Users, { foreignKey: 'userId' });
      }
    }
  });
  return GroupMembers;
};
