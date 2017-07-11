module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        // associations between messages and groups
        Messages.belongsTo(models.Groups, {

          foreignKey: 'groupId',
          onDelete: 'CASCADE',

        });

        // associations between messages and users
        Messages.belongsTo(models.Users, {

          foreignKey: 'userId',
          onDelete: 'CASCADE,'

        });
      }
    }
  });
  return Messages;
};
