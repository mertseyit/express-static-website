const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const bcrypt = require('bcrypt');
const Admin = require('./Admin');
const dateParserSimple = require('../helpers/dateParserSimple');

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
          msg: 'Email require',
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
    who_replied: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Admin,
        key: 'admin_id',
      },
    },
    createdat: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get() {
        const rawValue = this.getDataValue('createdat');
        return rawValue ? dateParserSimple(rawValue) : null;
      },
    },
    updatedat: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get() {
        const rawValue = this.getDataValue('updatedat');
        return rawValue ? dateParserSimple(rawValue) : null;
      },
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    modelName: 'UserFeedback',
    tableName: 'user_feedbacks',
  }
);

module.exports = UserFeedback;
