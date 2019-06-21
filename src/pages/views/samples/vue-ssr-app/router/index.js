import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/samples/vue-ssr-app',
    component: require('../views/cities/cities.vue').default
  },
  {
    path: '/samples/vue-ssr-app/weather',
    component: require('../views/weather/weather.vue').default
  },
];

export const createRouter = () => {
  const router = new VueRouter({
    mode: 'history',
    routes
  });

  return router;
};

