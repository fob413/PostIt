'use strict';

module.exports = function (sequelize, DataTypes) {
  var Messages = sequelize.define('Messages', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    authorsName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
        // associations between messages and groups
        Messages.belongsTo(models.Groups, {

          foreignKey: 'groupId',
          onDelete: 'CASCADE'

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