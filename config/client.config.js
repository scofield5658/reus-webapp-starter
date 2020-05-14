const env = process.env.NODE_ENV || "production";

const config = {
  dev: {

  },
  uat: {

  },
  production: {

  },
};

module.exports = config[env];
