'use strict';

import React from 'react';
import SSEStore from '../stores/sse';
import DestroyModal from './destroy-modal';

export default class Event extends React.Component {

  constructor() {
    super();
    this.state = { showDestroy: false };

    this.destroy = this.destroy.bind(this);
    this.showDestroy = this.showDestroy.bind(this);
    this.hideDestroy = this.hideDestroy.bind(this);
    this.renderEditButtons = this.renderEditButtons.bind(this);
  }

  destroy() {
    SSEStore.destroyEvent(this.props.index);
    this.hideDestroy();
  }

  showDestroy() {
    this.setState({ showDestroy: true });
  }

  hideDestroy() {
    this.setState({ showDestroy: false });
  }

  renderEditButtons() {
    if (this.props.loggedIn) {
      return (
        <div className='edit-links'>
          <button className='btn btn-info btn-small'>
            <i className='fa fa-pencil' /> Edit
          </button>
          <button className='btn btn-danger btn-small' onClick={this.showDestroy} >
            <i className='fa fa-trash' /> Delete
          </button>
        </div>
      );
    }
    return <span />;
  }

  render() {
    return(
      <div className='list-item'>
        <div className='list-title'>
          {this.props.event.name}
        </div>

        {this.renderEditButtons()}
        <DestroyModal
          show={this.state.showDestroy}
          close={this.hideDestroy}
          destroy={this.destroy} />
        <div className='clear'></div>
      </div>
    );

  }
}
