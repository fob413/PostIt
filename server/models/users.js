module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define('Users', {
    UserName: DataTypes.STRING,
    password: DataTypes.STRING,
    Email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Users.hasMany( models.Groups, {

          foreignKey: 'userId',
          as: 'groups',

        });
      },
    },
  });
  return Users;
};