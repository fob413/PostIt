module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    UserName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username must be unique.',
      },
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
      validate: {
        isEmail: true
      },
      unique: {
        args: true,
        msg: 'Email must be unique.',
      },
    },
    isLoggedin: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    classMethods: {

      associate: (models) => {
        // associations can be defined here

        // association between the users and the groups
        Users.belongsToMany(models.Groups, {

          through: 'members',

        });


        // association between users and messages
        Users.hasMany(models.Messages, {

          foreignKey: 'userId',

        });
      },
    },
    freezeTableName: true
  });
  return Users;
};
