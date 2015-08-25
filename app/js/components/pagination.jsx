'use strict';

import React from 'react';
import Pagination from 'react-bootstrap/lib/Pagination';
import SSEStore from '../stores/sse';

export default class Notification extends React.Component {

  constructor() {
    super();

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event, selectedEvent) {
    this.props.setPage(selectedEvent.eventKey);

    SSEStore.getEvents();
  }

  render() {
    return (
      <Pagination
        first
        last
        ellipsis
        items={Math.ceil(this.props.events.total/this.props.events.perPage)}
        maxButtons={5}
        activePage={this.props.events.currentPage}
        onSelect={this.handleSelect} />
    );
  }
}
