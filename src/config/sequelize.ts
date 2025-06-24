import { logger } from '../logger/Logger';
import { Sequelize } from 'sequelize';
import { environment } from './index';

const { db_name, db_user, db_password, db_host, dialect, db_port } = environment;
export const sequelize = new Sequelize(db_name, db_user, db_password, {
  host: db_host,
  dialect: dialect,
  port: db_port,
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    logger.info('👍 Connection has been established successfully.');

    // return sequelize.sync({ alter: true });
  })
  .catch(err => {
    logger.error('✗ Unable to connect to the database:', err);
  });