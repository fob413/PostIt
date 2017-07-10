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