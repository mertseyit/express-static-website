const { Sequelize } = require('sequelize');
const { config } = require('dotenv');
config();
const sequelize = new Sequelize({
  host: `${process.env.DATABASE_HOST}`,
  port: `${process.env.DATABASE_PORT}`,
  username: `${process.env.DATABASE_USER}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
