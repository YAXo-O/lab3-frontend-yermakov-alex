import SessionServices from '../requests/SessionServices';
import ConsumerServices from '../requests/ConsumerServices';
import EventServices from '../requests/EventServices';

export default {
  state: {
    sessions: {
      page: 0,
      totalCount: 0,
      totalPages: 0,
      items: [],
      isLoading: false,
      error: null,
    },
    session: {
      item: {
        consumers: {
          page: 0,
          totalCount: 0,
          totalPages: 0,
          items: [],
          isLoading: false,
          error: null,
        },
        events: {
          page: 0,
          totalCount: 0,
          totalPages: 0,
          items: [],
          isLoading: false,
          error: null,
        },
      },
      isLoading: false,
      error: null,
    },
  },
  getters: {
    SESSIONS: state => state.sessions,
    SESSION: state => state.session,
    CONSUMERS: state => state.session.item.consumers,
    EVENTS: state => state.session.item.events,
  },
  mutations: {
    UPDATE_SESSIONS: (state, payload) => Object.assign(state.sessions, payload),
    UPDATE_SESSION: (state, payload) => {
      const item = {};
      Object.assign(item, state.session.item, payload.item);
      Object.assign(state.session, payload, {item});
    },
    DELETE_SESSION: (state, payload) => Object.assign(state.session, {
      item: {
        consumers: {
          page: 0,
            totalCount: 0,
            totalPages: 0,
            items: [],
            isLoading: false,
            error: null,
        },
        events: {
          page: 0,
          totalCount: 0,
          totalPages: 0,
          items: [],
          isLoading: false,
          error: null,
        },
      },
      isLoading: false,
        error: null,
    }),
    UPDATE_CONSUMERS: (state, payload) => Object.assign(state.session.item.consumers, payload),
    UPDATE_CONSUMER: (state, payload) => {
      const updateId = state.session.item.consumers.items.findIndex(item => item.id === payload.id);
      if (updateId > -1) {
        Object.assign(state.session.item.consumers.items[updateId], payload);
      }
    },
    DELETE_CONSUMER: (state, payload) => {
      const deleteId = state.session.item.consumers.items.findIndex(item => item.id === payload);
      state.session.item.consumers.items.splice(deleteId, 1);
    },
    UPDATE_EVENTS: (state, payload) => Object.assign(state.session.item.events, payload),
  },
  actions: {
    // payload - page number
    RETRIEVE_SESSIONS: (context, payload) => {
      context.commit('UPDATE_SESSIONS', {
        isLoading: true,
        error: null,
      });

      SessionServices.fetchSessions(payload)
        .then(sessions => context.commit('UPDATE_SESSIONS', {
          ...sessions,
          isLoading: false,
          error: null,
        }))
        .catch(err => context.commit('UPDATE_SESSIONS', {
          page: 0,
          totalCount: 0,
          totalPages: 0,
          items: [],
          isLoading: false,
          error: err,
        }));
    },
    // payload - session id
    RETRIEVE_SESSION: (context, payload) => {
      context.commit('UPDATE_SESSION', {
        isLoading: true,
        error: null,
      });

      SessionServices.fetchSession(payload)
        .then(item => context.commit('UPDATE_SESSION', {
          item,
          isLoading: false,
          error: null
        }))
        .catch(err => context.commit('UPDATE_SESSION', {
          item: null,
          isLoading: false,
          error: err,
        }));
    },
    // payload - title and description
    CREATE_SESSION: (context, {title, description}) => {
      context.commit('UPDATE_SESSION', {
        isLoading: true,
        error: null,
      });
      SessionServices.createSession(title, description)
        .then(item => context.commit('UPDATE_SESSION', {
          item,
          isLoading: false,
          error: null,
        }))
        .catch(err => context.commit('UPDATE_SESSION', {
          item: null,
          isLoading: false,
          error: err,
        }));
    },
    UPDATE_SESSION: (context, payload) => {
      context.commit('UPDATE_SESSION', {
        isLoading: true,
        error: null,
      });

      SessionServices.updateSession(payload.id, payload.title, payload.description)
        .then(() => context.commit('UPDATE_SESSION', {
          isLoading: false,
          error: null,
          item: {
            title: payload.title,
            description: payload.description,
          }
        }))
        .catch(err => context.commit('UPDATE_SESSION', {
          isLoading: false,
          error: err,
        }));
    },
    DELETE_SESSION: (context, payload) => {
      context.commit('UPDATE_SESSION', {
        isLoading: true,
        error: null,
      });

      SessionServices.deleteSession(payload)
        .then(() => context.commit('DELETE_SESSION'))
        .catch(err => context.commit('UPDATE_SESSION', {
          isLoading: false,
          error: err,
        }));
    },
    // payload - id of consumer to be deleted
    DELETE_CONSUMER: (context, payload) => {
      ConsumerServices.deleteConsumer(payload)
        .then(() => context.commit('DELETE_CONSUMER', payload))
        .catch(err => context.commit('UPDATE_CONSUMER', {error: err}));
    },
    // Payload - object, containing session id and page number
    RETRIEVE_CONSUMERS: (context, payload) => {
      ConsumerServices.getConsumers(payload.sessionId, payload.page)
        .then((response) => context.commit('UPDATE_CONSUMERS', {
          ...response,
          isLoading: false,
          error: null,
        }))
        .catch(err => context.commit('UPDATE_CONSUMER', err));
    },
    UPDATE_CONSUMER: (context, payload) => {
      ConsumerServices.updateConsumer(payload.id, payload.firstName, payload.lastName)
        .then(() => context.commit('UPDATE_CONSUMER', payload))
        .catch(err => context.commit('UPDATE_CONSUMER', {error: err}));
    },
    RETRIEVE_EVENTS: (context, {page, sessionId, id}) => {
      context.commit('UPDATE_EVENTS', {
        isLoading: true,
        error: null,
      });

      EventServices.retrieveEvent(id, page, sessionId)
        .then(items => context.commit('UPDATE_EVENTS', {
          ...items,
          isLoading: false,
          error: null
        }))
        .catch(err => context.commit('UPDATE_EVENTS', {
          isLoading: false,
          error: err,
        }));
    },
    CREATE_EVENT: (context, {title, investorId, sessionId, page}) => {
      return EventServices.createEvent(title, sessionId, investorId)
        .then(() => context.dispatch('RETRIEVE_EVENTS', {
          page,
          sessionId,
        }));
    },
  },
};
