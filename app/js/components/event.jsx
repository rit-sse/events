'use strict';

import React from 'react';
import SSEStore from '../stores/sse';
import DestroyModal from './destroy-modal';
import FormModal from './form-modal';
import moment from 'moment-timezone';

export default class Event extends React.Component {

  constructor() {
    super();
    this.state = { showDestroy: false, event };

    this.destroy = this.destroy.bind(this);
    this.showDestroy = this.showDestroy.bind(this);
    this.hideDestroy = this.hideDestroy.bind(this);
    this.edit = this.edit.bind(this);
    this.showEdit = this.showEdit.bind(this);
    this.hideEdit = this.hideEdit.bind(this);
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

  edit(event) {
    SSEStore.updateEvent(this.props.index, event);
    this.hideEdit();
  }

  showEdit() {
    this.setState({ showEdit: true });
  }

  hideEdit() {
    this.setState({ showEdit: false });
  }


  renderEditButtons() {
    if (this.props.loggedIn) {
      return (
        <div className='edit-links'>
          <button className='btn btn-info btn-small' onClick={this.showEdit}>
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
        <div className='pull-left'>
          <div className='list-title'>
            {this.props.event.name}

          </div>
          <br />
          <div className='list-description'>{this.props.event.description} </div>
          <div className='list-description'>
            {moment(this.props.event.startDate).format('MM/DD/YY h:mm A')} - {moment(this.props.event.endDate).format('MM/DD/YY h:mm A')} @ {this.props.event.location}
          </div>
        </div>

        <div className='pull-right'>

          {this.renderEditButtons()}
        </div>
        <DestroyModal
          show={this.state.showDestroy}
          close={this.hideDestroy}
          destroy={this.destroy} />
        <FormModal
          title='Edit'
          show={this.state.showEdit}
          close={this.hideEdit}
          submit={this.edit}
          committees={this.props.committees}
          event={this.props.event} />
        <div className='clear'></div>
      </div>
    );

  }
}
