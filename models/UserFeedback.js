const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const bcrypt = require('bcrypt');

const UserFeedback = sequelize.define(
  'UserFeedback',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name require',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name require',
        },
        isEmail: {
          msg: 'Email must be valid',
        },
      },
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Subject require',
        },
      },
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Message require',
        },
      },
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    modelName: 'UserFeedback',
    tableName: 'user_feedback',
  }
);

module.exports = UserFeedback;
