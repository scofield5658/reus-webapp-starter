const path = require("path");
const reusConfig = require("../../../../../../config");

module.exports = {
  dev: {
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      [`${reusConfig.baseUrl}/api`]: {
        target: "http://localhost:8081",
      },
    },

    host: "localhost",
    port: 8082,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    showEslintErrorsInOverlay: false,
    devtool: "cheap-module-eval-source-map",
    cacheBusting: true,
    cssSourceMap: true,
  },

  build: {
    index: path.resolve(__dirname, "../dist/index.html"),

    assetsRoot: path.resolve(__dirname, "../dist/"),
    assetsSubDirectory: "static",
    assetsPublicPath: `${reusConfig.baseUrl}/views/samples/vue-hot-update/dist/`,

    productionSourceMap: true,
    devtool: "#source-map",
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],
    bundleAnalyzerReport: process.env.npm_config_report,
  },
};
