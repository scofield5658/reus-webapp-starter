const { Controller } = require('reus.js');

class HelloController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.json({ data: 'hello from HelloController' });
  }
}

module.exports = HelloController;
