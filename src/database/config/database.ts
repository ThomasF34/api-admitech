import Sequelize from 'sequelize';
const dbConfig = require('./config');


const env = process.env.NODE_ENV || 'development';
let config;
if (env === 'production') config = dbConfig.production;
else config = dbConfig.staging;

export = new Sequelize.Sequelize(config.url, {});
