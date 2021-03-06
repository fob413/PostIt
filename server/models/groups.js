module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
    groupName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        message: 'Username must be unique.',
      },
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations between group and users
        Groups.belongsToMany(models.Users, {
          through: 'groupMembers',
        });
        // associations between groups and messages
        Groups.hasMany(models.Messages, {
          foreignKey: 'groupId',
        });
        // associations between groups and members
        Groups.hasMany(models.GroupMembers, {
          foreignKey: 'groupId',
        });
      },
    },
  });
  return Groups;
};
