// initial state
const state = {
  direction: '',
  loading: false,
};

// getters
const getters = {
};

// actions
const actions = {
};

// mutations
const mutations = {
  direction(stateObj, val) {
    const s = stateObj;
    s.direction = val;
  },
  loading(stateObj, val) {
    const s = stateObj;
    s.loading = val;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
