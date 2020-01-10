const Samples = require("./samples");

module.exports = [
  {
    path: "/api/ping",
    method: "get",
    controller: require("../controllers/ping"),
  },
  ...Samples,
];
