'use strict';

import React from 'react';
import classnames from 'classnames';
import SSEStore from '../stores/sse';

export default class Filter extends React.Component {
  constructor() {
    super();
    this.select = this.select.bind(this);
  }

  select(name) {
    this.props.setCommittee(name);
    SSEStore.getEvents();
  }

  render() {
    return(
      <div className='filter'>
        <span className='entry'>Filter by:</span>
        <span className={classnames('entry', { active: !this.props.filters.committee })}><a onClick={this.select.bind(this, null)}>All</a></span>
        {this.props.committees.data.map(committee => {
          return (
            <span
              key={committee.id}
              className={classnames('entry', { active: this.props.filters.committee === committee.id })}
            >
              <a onClick={this.select.bind(null, committee.id)}>{committee.name}</a>
            </span>
          );
        })}
      </div>
    );

  }
}
