import Vue from "vue";
import VueRouter from "vue-router";
import { tgtRoute } from "../../../../../helpers/utils";

Vue.use(VueRouter);

export const routes = [
  {
    name: "cities",
    path: tgtRoute("/samples/vue-ssr-app"),
    component: require("../views/cities/cities.vue").default,
  },
  {
    name: "details",
    path: tgtRoute("/samples/vue-ssr-app/weather"),
    component: require("../views/weather/weather.vue").default,
  },
  { path: "/", redirect: tgtRoute("/samples/vue-ssr-app") },
];

export const createRouter = () => {
  const router = new VueRouter({
    mode: "history",
    routes,
  });

  return router;
};
