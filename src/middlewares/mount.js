const path = require('path');
const { Middleware } = require('reus.js');
const mount = require('koa-mount');
const stetic = require('koa-static');
const config = require('../../config');

class MountMiddleware extends Middleware {
  async index() {
    const { ctx, next } = this;
    return mount(`${config.baseUrl}`, stetic(path.join(__dirname, '..', 'pages')))(ctx, next);
  }
}

module.exports = MountMiddleware;
