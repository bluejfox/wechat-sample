import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './action';
import * as getters from './getter';
import common from './module/common';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    common,
  },
  strict: debug,
});
