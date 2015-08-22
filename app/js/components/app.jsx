'use strict';

import React from 'react';
import Filter from './filter';
import SSEStore from '../stores/sse';

export default class GoApp extends React.Component {

  constructor() {
    super();

    SSEStore.getCommittees();
    SSEStore.getEvents();
  }

  render() {
    return(
      <div id='content_wrapper'>
        <h1> Events</h1>
        <div className='display-wrapper'>
          <Filter {...this.props} />
        </div>
        <div className='clear'></div>
      </div>
    );

  }
}
