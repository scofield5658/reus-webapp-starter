const logger = require('./middlewares/logger');
const cache = require('./middlewares/cache');
const loader = require('./middlewares/loader');
const serve = require('./middlewares/serve');
const render = require('./helpers/render');

const routers = require('./routers');

module.exports = {
  routers,
  render,
  middlewares: [logger, cache, loader, serve],
};
