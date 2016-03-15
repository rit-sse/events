import api from '../api';
import EventsActions from '../actions/events';

export default {
  getEvents: {
    remote(state) {
      const obj = {};

      if (!isNaN(state.filters.perPage)) {
        obj.perPage = state.filters.perPage;
      }

      if (!isNaN(state.filters.page)) {
        obj.page = state.filters.page;
      }
      if (state.filters.when === 'past') {
        obj.before = new Date();
        obj.sort = 'DESC';
      } else if (state.filters.when === 'future') {
        obj.after = new Date();
        obj.sort = 'ASC';
      } else {
        obj.sort = 'DESC';
      }
      if (state.filters.committee) {
        obj.committee = state.filters.committee;
      }

      return api.Events.all(obj);
    },
    success: EventsActions.getEventsSuccess,
    error: EventsActions.getEventsFailed,
  },

  createEvent: {
    remote(state, body) {
      return api.Events.create(body);
    },
    success: EventsActions.createEventSuccess,
    error: EventsActions.createEventFailed,
  },

  updateEvent: {
    remote(state, index, body) {
      return Promise.all([index, api.Events.update(state.events.data[index].id, body)]);
    },
    success: EventsActions.updateEventSuccess,
    error: EventsActions.updateEventFailed,
  },

  destroyEvent: {
    remote(state, index) {
      return Promise.all([index, api.Events.destroy(state.events.data[index].id)]);
    },
    success: EventsActions.destroyEventSuccess,
    error: EventsActions.destroyEventFailed,
  },
};
