'use strict';

module.exports = function (sequelize, DataTypes) {
  var Members = sequelize.define('Members', {
    allowNull: DataTypes.FALSE
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here

        // associations between members and groups
        Groups.belongsTo(models.Groups, {

          foreignKey: 'groupId',
          onDelete: 'CASCADE'

        });
      }
    }
  });
  return Members;
};