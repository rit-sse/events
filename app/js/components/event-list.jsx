'use strict';

import React from 'react';
import Event from './event';

export default class EventList extends React.Component {
  render() {
    return(
      <div className='edit-list'>
        {this.props.events.data.map((event, index) => <Event key={event.id} committees={this.props.committees} event={event} loggedIn={this.props.loggedIn} index={index} />)}
      </div>
    );
  }
}
