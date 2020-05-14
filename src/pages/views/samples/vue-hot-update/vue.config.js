const reusConfig = require("../../../../../config");
const projectConfig = require("../../../../../project.config.json");

const useReus = process.env.BUILD_TAG === "reus";

module.exports = {
  publicPath: useReus ? `${reusConfig.baseUrl}/views/samples/vue-hot-update/dist/` : "/",
  pages: {
    index: {
      entry: "src/main.js",
      title: reusConfig.appName,
    },
  },
  devServer: {
    proxy: {
      [`${reusConfig.baseUrl}/api`]: {
        target: `http://localhost:${projectConfig.app.port}`,
        ws: false,
        changeOrigin: true,
      },
    },
  },
};
