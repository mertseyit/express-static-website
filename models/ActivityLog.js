const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const dateParserSimple = require('../helpers/dateParserSimple');

const ActivityLog = sequelize.define(
  'ActivityLog',
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
          msg: 'Admin require',
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

    event: {
      type: DataTypes.INTEGER, // 0: created, 1: deleted, 2:updated (CRUD)
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Event type require',
        },
      },
      get() {
        const rawValue = this.getDataValue('event');
        return rawValue === 0
          ? 'CREATE'
          : rawValue === 1
          ? 'DELETE'
          : rawValue === 2
          ? 'UPDATE'
          : 'UNDEFINED';
      },
    },

    page: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Page require',
        },
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
    modelName: 'ActivityLog',
    tableName: 'activity_logs',
  }
);

module.exports = ActivityLog;
