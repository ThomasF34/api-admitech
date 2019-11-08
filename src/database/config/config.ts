import dotenv from 'dotenv';
dotenv.config();

const staging = {
  url: <string>process.env.DATABASE_URL,
  dialect: 'postgres',
};

const production = {
  url: <string>process.env.DATABASE_URL,
  dialect: 'postgres',
};

export default { staging, production };

