const env = process.env.NODE_ENV || 'production';
const test = process.env.TEST_ENV || '';

// use webpack env to sep server and client config
// so server config cannot be seen in client
// do not modify anything here
const targetConfig = require(process.env.TARGET == 'client' ?
  './client.config.js' : './server.config.js');

module.exports = {
  timestamp: +new Date,
  env,
  test,
  baseUrl: process.env.BASE_URL || '',
  cdnUrl: process.env.CDN_URL || '',
  assets: /\.(png|jpe?g|gif|svg|pdf|ico)(\?.*)?$/i,
  ...{
    // dev
    dev: {},
    // production
    production: {}
  }[test || env],
  ...targetConfig,
};
