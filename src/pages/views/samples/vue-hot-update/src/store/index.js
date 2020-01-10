import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import config from "../../../../../../../config";
import global from "../global";
import account from "./modules/account";
import system from "./modules/system";

axios.defaults.timeout = global.httpTimeout;
axios.defaults.headers.post["Content-Type"] = global.httpContentType;
axios.defaults.baseURL = config.baseURL;
Vue.http = axios;

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account,
    system,
  },
  strict: false,
});
