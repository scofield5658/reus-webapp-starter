module.exports = [
  {
    path: '/limit',
    method: 'get',
    controller: require('../controllers/limit'),
    speed_limit: {
      type: 'memory',
      max: 2,
      duration: 5, // seconds
      errmsg: '自定义限速提示',
      validate: function(ctx) {
        return ctx.ip;
      }
    }
  },
];
