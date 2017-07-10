module.exports = function(sequelize, DataTypes) {
  const Groups = sequelize.define('Groups', {
    GroupName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Groups.belongsTo( models.Users, {

          foreignKey: usersId,
          onDelete: 'CASCADE',

        });
        Groups.hasMany( models.Messages, {

          foreignKey: 'groupId',
          as: 'messages',

        });
      },
    },
  });
  return Groups;
};