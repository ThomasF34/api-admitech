import Sequelize from 'sequelize';
import logger from '../../helpers/logger';
const dbConfig = require('./config');


const env = process.env.NODE_ENV || 'development';
let config;
if (env === 'production') config = dbConfig.production;
else config = dbConfig.staging;

export = new Sequelize.Sequelize(config.url, { logging: msg => logger.info(`Call to DB : ${msg}`) });
