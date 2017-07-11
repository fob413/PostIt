'use strict';

module.exports = function (sequelize, DataTypes) {
  var Messages = sequelize.define('Messages', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here

        //associations between messages and groups
        Groups.belongsTo(models.Groups, {

          foreignKey: groupId,
          onDelete: 'CASCADE'

        });

        // associations between messages and users
        Groups.belongsTo(models.Users, {

          foreignKey: userId,
          onDelete: 'CASCADE,'

        });
      }
    }
  });
  return Messages;
};