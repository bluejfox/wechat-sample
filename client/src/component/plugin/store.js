import Vue from 'vue';
import Vuex from 'vuex';
import { create } from '@/model/store';

Vue.use(Vuex);
const store = create(Vuex.Store);
export default store;
