const env = process.env.NODE_ENV || "production";

// use webpack env to sep server and client config
// so server config cannot be seen in client
// do not modify anything here
const targetConfig = process.env.TARGET === "client"
  ? require("./client.config.js") : require("./server.config.js");

const config = {
  dev: {

  },
  production: {

  },
};

module.exports = Object.assign({ /* eslint-disable-line */
  timestamp: +new Date(),
  env,
  baseUrl: process.env.BASE_URL || "/jagger",
  cdnUrl: process.env.CDN_URL || "/jagger",
  assets: /\.(png|jpe?g|gif|svg|pdf|ico)(\?.*)?$/i,
}, config[env], targetConfig);
