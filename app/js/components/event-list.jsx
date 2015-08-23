'use strict';

import React from 'react';
import Event from './event';

export default class EventList extends React.Component {
  render() {
    return(
      <div className='edit-list'>
        {this.props.events.data.map(event => <Event event={event} loggedIn={this.props.loggedIn} />)}
      </div>
    );
  }
}
