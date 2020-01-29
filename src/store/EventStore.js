import EventServices from '../requests/EventServices';
import ConsumptionServices from '../requests/ConsumptionServices';

export default {
  state: {
    event: {
      isLoading: false,
      error: null,
      item: {
        consumptions: {
          page: 0,
          totalCount: 0,
          totalPages: 0,
          items: [],
          isLoading: false,
          error: null,
        },
      },
    },
  },
  getters: {
    EVENT: state => state.event,
    CONSUMPTIONS: state => state.event.item.consumptions.items,
  },
  mutations: {
    UPDATE_EVENT: (state, payload) => Object.assign(state.event, payload),
    UPDATE_CONSUMPTIONS: (state, payload) => Object.assign(state.event.item.consumptions, payload),
  },
  actions: {
    RETRIEVE_EVENT: (context, {id}) => {
      context.commit('UPDATE_EVENT', {
        isLoading: true,
        error: null,
      });

      EventServices.retrieveEvent(id)
        .then(item => context.commit('UPDATE_EVENT', {
          item,
          isLoading: false,
          error: null,
        }))
        .catch(err => context.commit('UPDATE_EVENT', {
          isLoading: false,
          error: err,
        }));
    },
    CREATE_CONSUMPTION: (context, {cost, consumerId, eventId, description, page}) => {
      context.commit('UPDATE_CONSUMPTIONS', {
        isLoading: true,
        error: null,
      });

      ConsumptionServices.createConsumption(consumerId, cost, description, eventId)
        .then(() => context.dispatch('RETRIEVE_CONSUMPTIONS', {eventId, page}))
        .catch(err => context.commit('UPDATE_CONSUMPTIONS', {
          isLoading: false,
          error: err,
        }));
    },
    RETRIEVE_CONSUMPTIONS: (context, {eventId, page}) => {
      context.commit('UPDATE_CONSUMPTIONS', {
        isLoading: true,
        error: null,
      });

      ConsumptionServices.getConsumptions(eventId, page)
        .then(res => context.commit('UPDATE_CONSUMPTIONS', {
          isLoading: false,
          error: null,
          ...res,
        }))
        .catch(err => context.commit('UPDATE_CONSUMPTIONS', {
          isLoading: false,
          error: err,
        }));
    },
    DELETE_CONSUMPTION: (context, {id, page, eventId}) => {
      context.commit('UPDATE_CONSUMPTIONS', {
        isLoading: true,
        error: null,
      });

      ConsumptionServices.deleteConsumption(id)
        .then(() => context.dispatch('RETRIEVE_CONSUMPTIONS', {
          eventId,
          page,
        }))
        .catch(err => context.dispatch('UPDATE_CONSUMPTIONS', {
          isLoading: false,
          error: err,
        }));
    },
    UPDATE_CONSUMPTION: (context, {id, cost, description, consumerId, page, eventId}) => {
      context.commit('UPDATE_CONSUMPTIONS', {
        isLoading: true,
        error: null,
      });

      return ConsumptionServices.updateConsumption(id, cost, description, consumerId)
        .then(() => context.dispatch('RETRIEVE_CONSUMPTIONS', {
          eventId,
          page,
        }))
        .catch(err => context.dispatch('UPDATE_CONSUMPTION', {
          isLoading: false,
          error: err,
        }));
    },
  },
};
