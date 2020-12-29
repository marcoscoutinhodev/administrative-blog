const Sequelize = require("sequelize");
require("dotenv").config();

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_TYPE,
    timezone: process.env.DB_TIMEZONE
});

module.exports = connection;