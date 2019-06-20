const path = require('path');
const {tgtURL, abs2rel, absdest, hashfile, writefile} = require('../helpers/utils');
const config = require('../../config');

module.exports = function () {

  const relpath = ((abspath) => {
    if (config.env !== 'production') {
      return abs2rel(abspath);
    }

    const {name, buffer} = hashfile(abspath);
    const destpath = `${path.dirname(absdest(abs2rel(abspath)))}${path.sep}${name}`;
    writefile(destpath, buffer);
    return abs2rel(destpath);
  })(this.resourcePath);

  const url = tgtURL(relpath);
  return `module.exports = __webpack_public_path__ + ${JSON.stringify(url)};`;
};
