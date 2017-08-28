module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    authorsName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priorityValue: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'NORMAL'
    },
    readby: {
      type: DataTypes.STRING,
      allowNull: true
    }
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
