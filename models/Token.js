const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Token = sequelize.define(
  'Token',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Token require',
        },
      },
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Id require',
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
    timestamps: false,
    freezeTableName: true,
    modelName: 'Token',
    tableName: 'tokens',
  }
);

module.exports = Token;
