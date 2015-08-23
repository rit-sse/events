'use strict';

import React from 'react';
import classnames from 'classnames';
import SSEStore from '../stores/sse';

export default class NavTabs extends React.Component {
  constructor() {
    super();
    this.select = this.select.bind(this);
  }

  select(name) {
    this.props.setWhen(name);
    SSEStore.getEvents();
  }

  render() {
    return(
      <ul className='nav nav-tabs'>
        <li className={classnames({ active: this.props.filters.when === 'future' })}>
          <a onClick={this.select.bind(this, 'future')}>Future</a>
        </li>
        <li className={classnames({ active: this.props.filters.when === 'past' })}>
          <a onClick={this.select.bind(this, 'past')}>Past</a>
        </li>
        <li className={classnames({ active: this.props.filters.when === 'all' })}>
          <a onClick={this.select.bind(this, 'all')}>All</a>
        </li>
      </ul>
    );

  }
}
