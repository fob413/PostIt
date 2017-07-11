module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    UserName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
  }, {
    classMethods: {

      associate: (models) => {
        // associations can be defined here

        // association between the users and the groups
        Users.hasMany(models.Groups, {

          foreignKey: 'userId',

        });


        // association between users and messages
        Users.hasMany(models.Messages, {

          foreignKey: 'userId',

        });
      },
    },
  });
  return Users;
};
