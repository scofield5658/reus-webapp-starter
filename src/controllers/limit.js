const { Controller } = require('reus.js');

class LimitController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.json({ data: 'hello from LimitController' });
  }
}

module.exports = LimitController;
