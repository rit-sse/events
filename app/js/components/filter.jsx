'use strict';

import React from 'react';
import classnames from 'classnames';

export default class Filter extends React.Component {
  constructor() {
    super();
    this.select = this.select.bind(this);
  }

  select(name) {
    this.props.setSelected(name);
  }

  render() {
    return(
      <div className='filter'>
        <span className='entry'>Filter by:</span>
        <span className={classnames('entry', { active: !this.props.selected })}><a onClick={this.select.bind(this, null)}>All</a></span>
        {this.props.committees.data.map(committee => {
          return (
            <span
              key={committee.name}
              className={classnames('entry', { active: this.props.selected === committee.name })}
            >
              <a onClick={this.select.bind(null, committee.name)}>{committee.name}</a>
            </span>
          );
        })}
      </div>
    );

  }
}
