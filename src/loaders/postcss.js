const fs = require('fs');
const webpack = require('./webpack');

module.exports = function({filepath}) {
  return new Promise(async function(resolve, reject) {
    if (!fs.existsSync(filepath)) {
      return reject('file not exists');
    }

    const {extract} = await webpack({
      filepath,
      extract: {
        ext: 'css'
      }
    });

    resolve(extract);
  });
};
