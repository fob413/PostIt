module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
    GroupName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        message: 'Username must be unique.',
      },
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here

        // associations between group and users
        Groups.belongsToMany(models.Users, {

          through: 'members',

        });


        // associations between groups and messages
        Groups.hasMany(models.Messages, {

          foreignKey: 'groupId',

        });

        // associations between groups and members
        Groups.hasMany(models.Members, {

          foreignKey: 'groupId',

        }); 
      },
    },
  });
  return Groups;
};
