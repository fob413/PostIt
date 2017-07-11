'use strict';

module.exports = function (sequelize, DataTypes) {
  var Groups = sequelize.define('Groups', {
    GroupName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here

        //associations between group and users
        Groups.belongsTo(models.Users, {

          foreignKey: 'userId',
          onDelete: 'CASCADE'

        });

        //associations between groups and messages
        Groups.hasMany(models.Messages, {

          foreignKey: 'groupId'

        });

        // associations between groups and members
        Groups.hasMany(models.Members, {

          foreignKey: 'groupId'

        });
      }
    }
  });
  return Groups;
};