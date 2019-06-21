const { tgtRoute } = require('../helpers/utils');
const Samples = require('./samples');

const routers = [
  ...Samples,
];

module.exports = routers.map((function(route) {
  return Object.assign({}, route, { path: tgtRoute(route.path) } );
}));
