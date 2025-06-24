import { createJWToken } from '../config/auth';
import * as bcrypt from 'bcrypt';
import { environment } from '../config';

const {secret } = environment;
module.exports = function(sequelize, DataTypes) {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    user_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    indexes: [{ unique: true, fields: ['email'] }],
    timestamps: true,
    freezeTableName: true,
    paranoid: true
  });



   // ✅ Association
  users.associate = function (models) {
    users.hasMany(models.user_token, {
      foreignKey: 'user_id',
      as: 'tokens',
    });
  };


  users.beforeSave(user => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    }
  });

  users.prototype.generateToken = function generateToken() {
    console.log('JWT:' + secret);
    return createJWToken({ email: this.email, id: this.id });
  };

  users.prototype.authenticate = function authenticate(value) {
    if (bcrypt.compareSync(value, this.password))
      return this;
    else
      return false;
  };
  return users;
};
