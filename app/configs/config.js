'use strict';

module.exports = (() => ({
  app: {
    name: process.env.APP_NAME,
    port: process.env.APP_PORT,
    env: process.env.APP_ENV,
    key: process.env.APP_KEY,
    logPath: process.env.LOG_PATH
  },
  mongo: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
  logging: {
    file: process.env.LOG_PATH,
    level: process.env.LOG_LEVEL || 'info',
    console: process.env.LOG_ENABLE_CONSOLE || true
  }
}))();