'use strict';

import React from 'react';

export default class Event extends React.Component {
  render() {
    return(
      <div className='list-item'>

        <div className='list-title'>
          {this.props.event.name}
        </div>

        <div className='edit-links'>
          <button className='btn btn-info btn-small'>
            <i className='fa fa-pencil' /> Edit
          </button>
          <button className='btn btn-danger btn-small'>
            <i className='fa fa-pencil' /> Delete
          </button>
        </div>
        <div className='clear'></div>
      </div>
    );

  }
}
