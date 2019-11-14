const { Middleware } = require("reus.js");
const logger = require("../helpers/logger");

class LogMiddleware extends Middleware {
  async index() {
    const { ctx, next } = this;
    logger.info(`${ctx.url}:${ctx.method}`);
    return next();
  }
}

module.exports = LogMiddleware;
