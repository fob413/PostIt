'use strict';

module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    UserName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        message: 'Username must be unique.'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      validate: {
        isEmail: true
      }
    },
    isLoggedin: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    classMethods: {

      associate: function associate(models) {
        // associations can be defined here

        // association between the users and the groups
        Users.belongsToMany(models.Groups, {

          through: 'members'

        });

        // association between users and messages
        Users.hasMany(models.Messages, {

          foreignKey: 'userId'

        });
      }
    },
    freezeTableName: true
  });
  return Users;
};