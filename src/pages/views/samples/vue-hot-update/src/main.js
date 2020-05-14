// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import moment from "moment";
import { DatePicker, message } from "ant-design-vue";

import global from "./global";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "ant-design-vue/dist/antd.css";

Vue.config.productionTip = false;

axios.defaults.timeout = global.httpTimeout;
axios.defaults.headers.post["Content-Type"] = global.httpContentType;

Vue.prototype.$http = axios;
Vue.prototype.$moment = moment;

Vue.use(DatePicker);
Vue.prototype.$message = message;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
