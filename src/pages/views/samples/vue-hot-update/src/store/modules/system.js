import * as types from "../mutation-types";

const defaultState = {
  platform: "",
  theme: "light",
  width: 0,
  height: 0,
};

const actions = {
  setPlatform({ commit }, payload) {
    commit(types.OS_NAME, payload);
  },
  setTheme({ commit }, payload) {
    commit(types.SET_THEME, payload);
  },
};

const mutations = {
  [types.OS_NAME](state, payload) {
    state.platform = payload;
  },
  [types.SET_THEME](state, payload) {
    state.theme = payload;
  },
  [types.WINDOW_RESIZE](state, windowSize) {
    state.width = windowSize.width;
    state.height = windowSize.height;
  },
};

export default {
  state: defaultState,
  actions,
  mutations,
};
