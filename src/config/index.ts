import config from './config.js';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

export const environment = {
  ...config[env],
  db_name: process.env.DB_NAME || config[env].database,
  db_user: process.env.DB_USERNAME || config[env].username,
  db_password: process.env.DB_PASSWORD || config[env].password,
  db_host: process.env.DB_HOST || config[env].host,
  db_port: parseInt(process.env.DB_PORT || '5432', 10),
  dialect: process.env.DB_DRIVER || config[env].dialect,
  secret: process.env.JWT_SECRET
};