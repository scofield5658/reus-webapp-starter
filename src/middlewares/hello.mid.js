const { Middleware } = require('reus.js');

class HelloMiddleware extends Middleware {
  async index() {
    const { next } = this;
    console.log('before hello');
    return next();
  }
}

module.exports = HelloMiddleware;
