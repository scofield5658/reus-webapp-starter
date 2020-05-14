import * as types from "../mutationTypes";

const defaultState = {
  isLogin: false,
  userInfo: {},
};

const actions = {
  login({ commit }, userInfo) {
    commit(types.LOGIN_SUCCESS, userInfo);
  },
  logout({ commit }) {
    commit(types.LOGOUT_SUCCESS);
  },
};

const mutations = {
  [types.LOGIN_SUCCESS](state, userInfo) {
    state.userInfo = userInfo;
    state.isLogin = true;
  },
  [types.LOGIN_FAIL](state) {
    state.userInfo = {};
    state.isLogin = false;
  },
  [types.LOGOUT_SUCCESS](state) {
    state.userInfo = {};
    state.isLogin = false;
  },
  [types.LOGOUT_FAIL]() {
    // TODO:
  },
};

export default {
  state: defaultState,
  actions,
  mutations,
};
