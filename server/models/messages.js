module.exports = function(sequelize, DataTypes) {
  const Messages = sequelize.define('Messages', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Groups.belongsTo( models.Groups, {

          foreignKey: groupId,
          onDelete: 'CASCADE',

        });
      }
    }
  });
  return Messages;
};