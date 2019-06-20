const { Middleware } = require('reus.js');
const url = require('url');
const fs = require('fs');
const {srcUrl, srcRoute, abstmp} = require('../helpers/utils');
const loader = require('../loaders/loader');
const asset = require('../loaders/asset');
const config = require('../../config');

class LoaderMiddleware extends Middleware {
  async index() {
    const { ctx, next } = this;
    if (config.env === 'production') {
      return next();
    }

    const queries = ctx.query || {};

    if (queries['__compile'] === 'false') {
      return next();
    }

    if (queries['__temporary'] === 'true') {
      const tmpname = abstmp(srcUrl(url.parse(ctx.req.url).pathname));
      ctx.body = fs.readFileSync(tmpname, 'utf-8');
      return;
    }

    const pathname = srcUrl(url.parse(ctx.req.url).pathname);

    if (!loader.test({pathname})) {
      return next();
    }

    const {__library: library = ''} = asset.link.parse(ctx.req.url);
    const referer = srcRoute(url.parse((ctx.req.headers['referer'] || '')).pathname) || '*';
    const {type, content} = await loader.compile({pathname, referer, library});

    ctx.type = type;
    ctx.body = content;
  }
}

module.exports = LoaderMiddleware;
