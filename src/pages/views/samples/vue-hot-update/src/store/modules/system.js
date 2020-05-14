import * as types from "../mutationTypes";

const defaultState = {
  platform: "",
  width: 0,
  height: 0,
};

const actions = {
  setPlatform({ commit }, payload) {
    commit(types.OS_NAME, payload);
  },
};

const mutations = {
  [types.OS_NAME](state, payload) {
    state.platform = payload;
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
