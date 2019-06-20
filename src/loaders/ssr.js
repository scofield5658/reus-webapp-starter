const {abssrc, abstmp, absdest, writefile, radom} = require('../helpers/utils');
const webpack = require('../loaders/webpack');
const routes = require('../routers');
const config = require('../../config');

// pre-load ssr entry
if (config.env === 'production') {
  for (const route in routes) {
    const {ssr: {entry} = {}} = routes[route];
    if (entry) {
      require(absdest(entry));
    }
  }
}

module.exports = {
  vue({entry, route}) {
    return new Promise(async function(resolve, reject) {
      try {
        const filepath = await (async function() {
          if (config.env === 'production') {
            return absdest(entry);
          }

          const {content} = await webpack({
            filepath: abssrc(entry),
            //referer: srcUrl(url.parse(route).pathname),
            target: 'node',
            extract: {ext: 'css'}});
          const tmppath = `${abstmp(entry)}.${radom()}.js`;

          writefile(tmppath, content);

          return tmppath;
        })();

        const {createApp} = require(filepath);
        const {app, router, store} = createApp();

        router.push(route);
        router.onReady(function() {
          const components = router.getMatchedComponents();
          if (!components.length) {
            return reject('not found');
          }

          Promise.all(components.map(function({asyncData}) {
            return asyncData && asyncData({store, route: router.currentRoute});
          })).then(async function() {
            const renderer = require('vue-server-renderer').createRenderer();
            const html = await renderer.renderToString(app);

            resolve({
              enable: true,
              html,
              state: store.state
            });

          }).catch(reject);
        }, reject);
      } catch (ex) {
        reject(ex);
      }
    });
  }
};
