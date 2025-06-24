module.exports = function (sequelize, DataTypes) {
  const user_token = sequelize.define('user_token', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    timestamps: true,
    freezeTableName: true,
    paranoid: true,
  });

  user_token.associate = function (models) {
    user_token.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return user_token;
};
