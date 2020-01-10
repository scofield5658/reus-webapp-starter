const { Controller } = require("reus.js");

class PingController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.json({ data: "pong", time: Date.now() });
  }
}

module.exports = PingController;
