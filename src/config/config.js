require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });

module.exports = {
  local: {
    db_host: process.env.DB_HOST,
    secret: process.env.JWT_SECRET,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DRIVER,
    db_port: Number(process.env.DB_PORT),
    port: process.env.PORT
  },
  development: {
    db_host: process.env.DB_HOSTNAME,
    secret: process.env.JWT_SECRET,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_driver: process.env.DB_DRIVER ,
    db_port: process.env.DB_PORT,
    port: process.env.PORT
  },
  test: {
    db_host: process.env.DB_HOSTNAME,
    secret: process.env.SECRET,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_driver: process.env.DB_DRIVER,
    db_port: process.env.DB_PORT,
    port: process.env.PORT
  },
  production: {
    db_host: process.env.DB_HOSTNAME,
    secret: process.env.SECRET,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_driver: process.env.DB_DRIVER,
    db_port: process.env.DB_PORT,
    port: process.env.PORT
  }
};

