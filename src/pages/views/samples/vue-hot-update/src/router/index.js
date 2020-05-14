import Vue from "vue";
import Router from "vue-router";
import HomePage from "../containers/home/home.vue";

Vue.use(Router);

export default new Router({
  routes: [{
    path: "/home",
    name: "主页",
    component: HomePage,
  }, {
    path: "*",
    redirect: "/home",
  }],
});
