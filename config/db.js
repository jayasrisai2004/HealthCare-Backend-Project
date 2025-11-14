const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.PG_DATABASE, 
  process.env.PG_USER, 
  process.env.PG_PASSWORD, 
  {
    host: process.env.PG_HOST,
    dialect: 'postgres',
    port: process.env.PG_PORT,
    logging: false
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully');
  } catch (err) {
    console.error('Unable to connect to PostgreSQL:', err);
  }
};

module.exports = { sequelize, connectDB };
