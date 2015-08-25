'use strict';

import React from 'react';
import Event from './event';
import Pagination from './pagination';

export default class EventList extends React.Component {
  render() {
    return(
      <div>
        <div className='edit-list'>
          {this.props.events.data.map((event, index) => <Event key={event.id} committees={this.props.committees} event={event} loggedIn={this.props.loggedIn} index={index} />)}
        </div>
        <div className='pagination text-center'>
          <Pagination events={this.props.events} setPage={this.props.setPage} />
        </div>
      </div>
    );
  }
}
