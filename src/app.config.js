const logger = require('./middlewares/logger');
const routers = require('./routers');

module.exports = {
  routers,
  middlewares: [logger],
};
