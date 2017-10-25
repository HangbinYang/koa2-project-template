module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'API',
      script    : 'app.js',
      error_file: 'logs/err.log',
      out_file  : 'logs/out.log',
      merge_logs: true,
      log_date_format: 'MM-dd HH:mm:ss',
      env: {
        NODE_ENV: 'dev',
        PORT: 3000,
        SESSION_PORT_TCP_HOST: '127.0.0.1',
        SESSION_PORT_TCP_PORT: 6379,
        MONGO_URI: 'mongodb://localhost:27017/default'
      },
      env_production : {
        NODE_ENV: 'production',
        PORT: 8088,
        SESSION_PORT_TCP_HOST: '127.0.0.1',
        SESSION_PORT_TCP_PORT: 6379,
        MONGO_URI: 'mongodb://localhost:27017/default'
      }
    }
  ]
};
