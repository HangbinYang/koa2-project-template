'use strict'

/**
 * Configuration description
 * 建议使用PM2管理生产环境，以便设置环境变量
 * http://pm2.keymetrics.io/
 * See more: ./ecosystem.config.js
 */

module.exports = {
  redis: {
    host: process.env.SESSION_PORT_TCP_HOST || '127.0.0.1',
    port: process.env.SESSION_PORT_TCP_PORT || 6379,
    keys: ['custom_redis_key_1', 'custom_redis_key_2']
  },

  mongo: process.env.MONGO_URI || 'mongodb://localhost:27017/default',

  port: process.env.PORT || 3000
}