module.exports = [
  {
    path: '/hello',
    method: 'get',
    controller: require('../controllers/hello'),
    middlewares: [require('../middlewares/hello.mid')],
  },
];
