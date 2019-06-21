const { Middleware } = require('reus.js');
const mount = require('koa-mount');
const serve = require('koa-static');
const config = require('../../config');

class ServeMiddleware extends Middleware {
  async index() {
    const { ctx, next } = this;
    const pagesUrl = __dirname + '/../pages';
    return mount(`${config.baseUrl}`, serve(pagesUrl))(ctx, next);
  }
}

module.exports = ServeMiddleware;
