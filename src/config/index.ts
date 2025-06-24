import config from './config.js';

const env = process.env.NODE_ENV || 'development';

export const environment = config[env];

