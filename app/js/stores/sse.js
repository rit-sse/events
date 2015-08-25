'use strict';

import alt from '../alt';
import AuthActions from '../actions/auth';
import AuthSource from '../sources/auth';
import EventsActions from '../actions/events';
import EventsSource from '../sources/events';
import CommitteesActions from '../actions/committees';
import CommitteesSource from '../sources/committees';
import SelectActions from '../actions/select';
import querystring from 'querystring';

class SSEStore {
  constructor() {
    this.loggedIn = false;
    this.err = null;
    this.events = { data: [] };
    this.committees = { data: [] };
    this.filters = querystring.parse(location.search.replace('?', ''));
    this.filters.when = this.filters.when || 'future';
    this.status = null;

    this.registerAsync(AuthSource);
    this.registerAsync(EventsSource);
    this.registerAsync(CommitteesSource);

    this.bindActions(AuthActions);
    this.bindActions(EventsActions);
    this.bindActions(CommitteesActions);
    this.bindActions(SelectActions);
  }

  setError(err) {
    if ( err.message === 'Unauthorized' ) {
      this.err = { message: 'Token expired. Try logging in again.' };
      this.loggedIn = false;
    } else {
      this.err = err;
    }
    this.status = null;
  }

  setStatus(status) {
    this.err = null;
    this.status = status;
  }

  onSignInSuccess() {
    this.setStatus({ message: 'Signed in successfully' });
    this.loggedIn = true;
  }

  onSignInFailed(err) {
    this.setError(err);
    this.loggedIn = false;
  }

  onSignOutSuccess() {
    this.setStatus({ message: 'Signed out successfully' });
    this.loggedIn = false;
  }

  onGetCommitteesSuccess(payload) {
    this.committees = payload;
    this.status = null;
    this.err = null;

  }

  onGetCommitteesFailed(err) {
    this.setError(err);
  }


  onGetEventsSuccess(payload) {
    this.events = payload;
    this.status = null;
    this.err = null;
    History.pushState(this.filters, 'SSE Events', `?${querystring.stringify(this.filters)}`);
  }

  onGetEventsFailed(err) {
    this.setError(err);
  }

  onCreateEventSuccess(payload) {
    if (parseInt(this.events.currentPage, 10) === 1) {
      this.events.data.unshift(payload);
    }
    this.setStatus({ message: 'Successfully created an event.' });
  }

  onCreateEventFailed(err ) {
    this.setError(err);
  }

  onUpdateEventSuccess(payload) {
    this.events.data.splice(payload[0], 1, payload[1]);
    this.setStatus({ message: 'Successfully updated an event.' });
  }

  onUpdateEventFailed(err ) {
    this.setError(err);
  }

  onDestroyEventSuccess(payload) {
    this.events.data.splice(payload[0], 1);
    this.events.total--;
    this.setStatus({ message: 'Successfully deleted an event.' });
  }

  onDestroyEventFailed(err) {
    this.setError(err);
  }

  onSetCommittee(committee) {
    this.filters.committee = committee;
  }

  onSetWhen(when) {
    this.filters.when = when;
  }

  onSetPage(page) {
    this.filters.page = page;
  }

}

export default alt.createStore(SSEStore, 'SSEStore');
