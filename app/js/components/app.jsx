'use strict';

import React from 'react';
import Filter from './filter';
import SSEStore from '../stores/sse';
import LogIn from './log-in';
import NavTabs from './nav-tabs';
import Notification from './notification';
import EventList from './event-list';

export default class GoApp extends React.Component {

  constructor() {
    super();

    SSEStore.getCommittees();
    SSEStore.getEvents();

    this.renderSignIn = this.renderSignIn.bind(this);
  }

  renderSignIn() {
    if (!this.props.loggedIn) {
      return <LogIn />;
    }

    return (
      <button id='sign-out' className='btn' onClick={SSEStore.signOut}>Sign Out</button>
    );
  }

  render() {
    return(
      <div id='content_wrapper'>
        <Notification alertType='success' notice={this.props.status} />
        <Notification alertType='danger' notice={this.props.err} />
        <div className='pull-right'>{this.renderSignIn()}</div>
        <h1>Events</h1>
        <div className='display-wrapper'>
          <Filter {...this.props} />
        </div>
        <br/>
        <NavTabs {...this.props} />
        <EventList {...this.props} />
        <div className='clear'></div>
      </div>
    );

  }
}
