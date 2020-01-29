import Vue from 'vue';
import Vuex from 'vuex';

import SessionStore from './SessionStore'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...SessionStore.state,
  },
  getters: {
    ...SessionStore.getters,
  },
  mutations: {
    ...SessionStore.mutations,
  },
  actions: {
    ...SessionStore.actions,
  },
});
