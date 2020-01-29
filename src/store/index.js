import Vue from 'vue';
import Vuex from 'vuex';

import SessionStore from './SessionStore';
import InvestorsStore from './InvestorsStore';
import EventStore from './EventStore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...SessionStore.state,
    ...InvestorsStore.state,
    ...EventStore.state,
  },
  getters: {
    ...SessionStore.getters,
    ...InvestorsStore.getters,
    ...EventStore.getters,
  },
  mutations: {
    ...SessionStore.mutations,
    ...InvestorsStore.mutations,
    ...EventStore.mutations,
  },
  actions: {
    ...SessionStore.actions,
    ...InvestorsStore.actions,
    ...EventStore.actions,
  },
});
