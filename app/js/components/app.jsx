import React from 'react';
import Filter from './filter';
import SSEStore from '../stores/sse';
import LogIn from './log-in';
import Notification from './notification';
import EventList from './event-list';
import FormModal from './form-modal';

export default class GoApp extends React.Component {

  constructor() {
    super();

    this.state = { showNew: false };

    SSEStore.getCommittees();
    SSEStore.getEvents();

    this.renderSignIn = this.renderSignIn.bind(this);
    this.new = this.new.bind(this);
    this.showNew = this.showNew.bind(this);
    this.hideNew = this.hideNew.bind(this);
  }

  new(event) {
    SSEStore.createEvent(event);
    this.hideNew();
  }

  showNew() {
    this.setState({ showNew: true });
  }

  hideNew() {
    this.setState({ showNew: false });
  }

  renderSignIn() {
    if (!this.props.loggedIn) {
      return <LogIn />;
    }

    return (
      <span>
        <button id='new' className='btn btn-info' onClick={this.showNew}><i className='fa fa-plus' /> Create Event </button>
        <button id='sign-out' className='btn' onClick={SSEStore.signOut}>Sign Out</button>
      </span>
    );
  }

  render() {
    return (
      <div id='content_wrapper'>
        <Notification alertType='success' notice={this.props.status} />
        <Notification alertType='danger' notice={this.props.err} />
        <div className='pull-right'>{this.renderSignIn()}</div>
        <h1>Events</h1>
        <div className='display-wrapper'>
          <Filter {...this.props} />
        </div>
        <br/>
        <EventList {...this.props} />
        <FormModal
          title='Create'
          show={this.state.showNew}
          close={this.hideNew}
          submit={this.new}
          committees={this.props.committees}
          event={{}} />
        <div className='clear'></div>
      </div>
    );

  }
}
