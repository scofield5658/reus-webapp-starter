const env = process.env.NODE_ENV || "production";

module.exports = {

  ...{
    // dev
    dev: {

    },

    // production
    production: {

    },
  }[env],
};
