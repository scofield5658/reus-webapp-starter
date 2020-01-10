const env = process.env.NODE_ENV || "production";

const config = {
  dev: {

  },
  production: {

  },
};

module.exports = config[env];
