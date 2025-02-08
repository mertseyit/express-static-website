const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const bcrypt = require('bcrypt');
const Admin = require('./Admin');

const Blog = sequelize.define(
  'Blog',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Admin,
        key: 'admin_id',
      },
    },
    blog_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Blog title require',
        },
      },
    },

    preview_img: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Image require',
        },
      },
    },

    image_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Image name require',
        },
      },
    },

    blog_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Blog text require',
        },
      },
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    modelName: 'Blog',
    tableName: 'blogs',
  }
);

module.exports = Blog;
