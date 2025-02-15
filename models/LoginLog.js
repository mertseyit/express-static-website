const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const dateParserSimple = require('../helpers/dateParserSimple');

const LoginLog = sequelize.define(
  'LoginLog',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    admin_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Admin name require',
        },
      },
    },
    admin_email: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Admin name require',
        },
        isEmail: {
          msg: 'Admin email must be valid',
        },
      },
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'IP address require',
        },
      },
    },

    status: {
      type: DataTypes.INTEGER, // 0: unauthorized, 1: incorrect password, 2:success (login situations)
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Statu type require',
        },
      },
      get() {
        const rawValue = this.getDataValue('status');
        return rawValue === 0
          ? 'UNAUTHORIZED'
          : rawValue === 1
          ? 'INCORRECT_PASSWORD'
          : rawValue === 2
          ? 'SUCCESS'
          : 'UNDEFINED';
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
    modelName: 'LoginLog',
    tableName: 'login_logs',
  }
);

module.exports = LoginLog;
