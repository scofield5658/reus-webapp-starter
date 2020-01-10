// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import moment from "moment";
import Icon from "vue-awesome/components/Icon.vue";
import {
  Header, Tabbar, TabItem, Field, Button,
} from "mint-ui";
import config from "../../../../../../config";
import global from "./global";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "mint-ui/lib/style.css";
import "vue-awesome/icons";

Vue.component(Header.name, Header);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.component("icon", Icon);

Vue.config.productionTip = false;

axios.defaults.timeout = global.httpTimeout;
axios.defaults.headers.post["Content-Type"] = global.httpContentType;
axios.defaults.baseURL = config.baseUrl;

Vue.prototype.$http = axios;
Vue.prototype.$moment = moment;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App },
});
