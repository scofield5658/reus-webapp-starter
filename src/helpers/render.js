const swig = require('swig');
const url = require('url');
const minify = require('html-minifier');
const config = require('../../config');
const manifest = require('../loaders/manifest');
const asset = require('../loaders/asset');
const referer = require('../loaders/referer');
const ssr = require('../loaders/ssr');
const routes = require('../routers');
const {srcRoute, srcUrl, writefile, abssrc, abstmp, absdest, abs2rel, tgtURL} = require('../helpers/utils');

swig.setDefaults({
  cache: config === 'production'
});

const getRoute = (route) => {
  for (const { path: name } of routes) {
    const regexp = new RegExp(`^${name}`, 'gi');
    regexp.lastIndex = 0;
    if (regexp.test(route)) {
      return name;
    }
  }
  throw 'not found';
};

const getRenderParams = ({ html = '', state = {}, enable = false }) => {
  return {
    __SSR__: enable,
    __HTML__: html,
    __STATE__: JSON.stringify(state)
  };
};

module.exports = async function(ctx, viewpath, data) {
  const route = srcRoute(getRoute(url.parse(ctx.req.url).pathname));
  const { ssr: ssrConfig } = data;

  let viewData = {};

  const queries = ctx.query || {};
  if (ssrConfig && (config.env === 'production' || queries.__ssr)) {
    const {type, entry} = ssrConfig;
    const {html, state, enable} = await ssr[type]({entry, route: ctx.req.url});
    viewData = await getRenderParams({ html, state, enable });
  } else {
    viewData = await getRenderParams({});
  }

  if ((config.mirage && config.mirage.enable)
    && config.env === 'production') {
    Object.assign(viewData, {
      __CACHES__: JSON.stringify(
        referer.next({route, limit: config.mirage.limit})
          .reduce((files, route) => {
            files = files.concat(route.files.map(tgtURL));
            return files;
          }, [])
      )
    });
  }

  let html = null;
  if (config.env !== 'production') {
    asset.html.rels(abssrc(viewpath))
      .forEach((rel) => {
        writefile(abstmp(abs2rel(rel)), asset.html.link(rel));
      });

    html = swig.compileFile(abstmp(viewpath))(viewData);
  } else {
    html = swig.compileFile(absdest(viewpath))(viewData);
  }

  const tags = [
    {
      tagname: 'css',
      from: '<!-- CSS_FILE -->',
      to: '<link rel="stylesheet" type="text/css" href="$SRC"/>'
    },
    {
      tagname: 'js',
      from: '<!-- JS_FILE -->',
      to: '<script type="text/javascript" src="$SRC"></script>'
    }
  ];

  // collect res
  if (config.env !== 'production') {
    //manifest.pages.remove(route);
    manifest.pages.set(route, 'html', viewpath);

    for (const {tagname} of tags) {
      const urls = asset.tags.parse(tagname, html).map(asset.link.stringify);
      manifest.pages.set(route, tagname, urls.map(srcUrl));
    }
  }

  // delete tags
  for (const {tagname} of tags) {
    html = html.replace(new RegExp(`<${tagname} ([^>]+)></${tagname}>`, 'gmi'), '');
  }

  // attach res
  for (const {tagname, from, to} of tags) {
    const urls = manifest.pages.get(route, tagname) || [];
    html = html.replace(from, urls.reduce((links, url) => {
      links.push(to.replace('$SRC', `${tgtURL(url)}`));
      return links;
    }, []).join('\r\n'));
  }

  ctx.type = 'text/html;charset=utf-8';
  ctx.body = config.env !== 'production' ?
    html : minify.minify(html, {
      conservativeCollapse: true,
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      ignoreCustomComments: true
    });

  // record referer
  if ((config.mirage && config.mirage.enable)
    && config.env === 'production') {
    const ref = ctx.req.headers['referer'];
    if (ref) {
      const refRoute = srcRoute(url.parse(ref).pathname);
      if (route == refRoute) {
        return;
      }

      referer.dot({
        route: refRoute,
        next: route
      });
    }
  }
};
