const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const bcrypt = require('bcrypt');

const Admin = sequelize.define(
  'Admin',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Firstname is required' },
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Lastname is required' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Email is required' },
        isEmail: { msg: 'Invalid email format' },
      },
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password is required' },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
    modelName: 'Admin',
    tableName: 'admins',
  }
);

// Şifreyi hashlemek için `beforeCreate` ve `beforeUpdate` hook'larını ekledim
Admin.beforeCreate(async (admin) => {
  admin.password = await bcrypt.hash(admin.password, 10);
});

Admin.beforeUpdate(async (admin) => {
  if (admin.changed('password')) {
    admin.password = await bcrypt.hash(admin.password, 10);
  }
});

module.exports = Admin;
