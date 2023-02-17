import { Dialect, Sequelize } from 'sequelize';
require('dotenv').config();


/**
 * Importing ENV variable from .env file
 */
const user = process.env.DB_USER
const database = process.env.DB_DATABASE


/**
 * Connecting mysql database with sequelizer
 */
const sequelize = new Sequelize(`${database}`,`${user}` , process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
})


export default sequelize;