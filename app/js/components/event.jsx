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
    this.formatDateRange = this.formatDateRange.bind(this);
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

  formatDateRange() {
    const date = 'dddd M/DD';
    const time = 'h:mm a';
    let dateString = moment(this.props.event.startDate).format(date + ', ' + time);
    if (moment(this.props.event.startDate).format(date) !== moment(this.props.event.endDate).format(date)) {
      dateString += ' - ' + moment(this.props.event.endDate).format(date + ', ' + time);
    } else {
      dateString += ' - ' + moment(this.props.event.endDate).format(time);
    }
    return dateString;
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
      <div className='event-preview-wrapper'>
          <div className='event-preview'>
            <div className='row flex-container'>
              <div className='span10'>
                <h3 className='event-title'>{this.props.event.name}</h3>
                <div className='event-info'>
                  {this.formatDateRange()}
                </div>
                <div className='event-description'>
                  {this.props.event.description}
                </div>
              </div>
              <div className='span2' style={{ marginLeft: 0 }} >
                {this.renderEditButtons()}
              </div>
            </div>

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
