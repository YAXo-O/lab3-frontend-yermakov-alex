import ConsumerServices from '../requests/ConsumerServices';

export default {
  state: {
    investors: {
      sessionId: '',
      page: 0,
      totalCount: 0,
      totalPages: 0,
      isLoading: false,
      error: null,
      items: [],
    },
  },
  getters: {
    INVESTORS: state => state.investors,
  },
  mutations: {
    UPDATE_INVESTORS: (state, payload) => Object.assign(state.investors, payload),
  },
  actions: {
    RETRIEVE_INVESTORS: (context, {sessionId, page}) => {
      context.commit('UPDATE_INVESTORS', {
        isLoading: true,
        error: null,
      });

      ConsumerServices.getConsumers(sessionId, page)
        .then(res => context.commit('UPDATE_INVESTORS', {
          ...res,
          isLoading: false,
        }))
        .catch(err => context.commit('UPDATE_INVESTORS', {
          isLoading: false,
          error: err,
        }));
    }
  },
};
