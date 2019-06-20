const manifest = require('../loaders/manifest');
const config = require('../../config');

let refers = {};
const referer = {
  get({route, next}) {
    const nexts = (refers[route] || (refers[route] = []))
      .filter(function(refer){ return refer.route == next; });

    return nexts.length
      ? nexts[0] :
      {
        route: next,
        count: 0,
        files: (function() {
          const cssfiles = manifest.pages.get(next, 'css') || [];
          const jsfiles = manifest.pages.get(next, 'js') || [];

          return [].concat(cssfiles).concat(jsfiles);
        })()
      };
  },
  set({route, next, data}) {
    const nexts = refers[route] || (refers[route] = []);

    for (let i = 0, ii = nexts.length; i < ii; i++) {
      if (nexts[i].route === next) {
        nexts[i] = data;
        return;
      }
    }

    nexts.push(data);
  },
  dot({route, next}) {

    process.nextTick(function() {

      const data = referer.get({route, next});

      data.count++;

      this.set({route, next, data});
    });
  },
  next({route, limit = 3}) {
    return (refers[route] || (refers[route] = [])).slice(0, limit);
  },
  sort() {
    for (const route in refers) {
      (refers[route] || (refers[route] = []))
        .sort(function(current, next) {
          return current.count < next.count;
        });
    }
  },
  clear() {
    refers = {};
  }
};

if ((config.mirage && config.mirage.enable)
  && config.env === 'production') {
  setInterval(referer.sort, config.mirage.interval || 60000);
}

module.exports = referer;
