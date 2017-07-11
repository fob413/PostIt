module.exports = (sequelize, DataTypes) => {
  const Members = sequelize.define('Members', {
    allowNull: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here

        // associations between members and groups
        Members.belongsTo(models.Groups, {

          foreignKey: 'groupId',
          onDelete: 'CASCADE',

        });
      }
    }
  });
  return Members;
};