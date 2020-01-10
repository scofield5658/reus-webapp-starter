import Vue from "vue";
import Router from "vue-router";
import LoginPage from "../containers/LoginPage.vue";
import HomePage from "../containers/HomePage.vue";
import ProductPage from "../containers/ProductPage.vue";
import MinePage from "../containers/MinePage.vue";

Vue.use(Router);

export default new Router({
  routes: [{
    path: "/login",
    name: "登录",
    component: LoginPage,
  }, {
    path: "/home",
    name: "主页",
    component: HomePage,
  }, {
    path: "/product",
    name: "产品",
    component: ProductPage,
  }, {
    path: "/mine",
    name: "我的",
    component: MinePage,
  }, {
    path: "*",
    redirect: "/home",
  }],
});
