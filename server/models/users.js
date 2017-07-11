module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define('Users', {
    UserName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING
    },
  }, {
    classMethods: {

      associate: (models) => {
        // associations can be defined here

        //association between the users and the groups
        Users.hasMany( models.Groups, {

          foreignKey: 'userId',

        });


        //association between users and messages
        Users.hasMany( models.Messages, {

          foreignKey: 'userId',

        })
      },
    },
  });
  return Users;
};