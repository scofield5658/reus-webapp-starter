import Vue from "vue";
import Vuex from "vuex";
import account from "./modules/account";
import system from "./modules/system";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account,
    system,
  },
  strict: false,
});
