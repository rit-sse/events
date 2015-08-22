'use strict';

import api from '../api';
import EventsActions from '../actions/events';
import querystring from 'querystring';

export default {
  getEvents: {
    remote() {
      const query = querystring.parse(location.search.replace('?', ''));
      const obj = {};
      if (!isNaN(query.perPage)) {
        obj.perPage = query.perPage;
      }

      if (!isNaN(query.page)) {
        obj.page = query.page;
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
      return Promise.all([index, api.Events.update(state.eventData.data[index].id, body)]);
    },
    success: EventsActions.updateEventSuccess,
    error: EventsActions.updateEventFailed,
  },

  destroyEvent: {
    remote(state, index) {
      return Promise.all([index, api.Events.destroy(state.linkData.data[index].shortEvent)]);
    },
    success: EventsActions.destroyEventSuccess,
    error: EventsActions.destroyEventFailed,
  },
};
