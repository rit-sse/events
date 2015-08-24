'use strict';

import React from 'react';
import Modal from './modal';

export default class FormModal extends React.Component {

  constructor() {
    super();

    this.submit = this.submit.bind(this);
  }

  submit() {
    const event = ['name', 'startDate', 'endDate', 'description', 'location', 'image', 'committeeId']
      .reduce((prev, key) => {
        prev[key] = this.refs[key].getDOMNode().value;
        return prev;
      }, {});

    this.props.submit(event);
  }

  render() {
    return(
      <Modal
        show={this.props.show}
        close={this.props.close}
        closeText='Cancel'
        submitText={`${this.props.title} Event`}
        header={`${this.props.title} Event`}
        submit={this.submit}
      >
        <div className='form-horizontal'>
          <div className='control-group'>
            <label className='control-label' htmlFor='name'>Name</label>
            <div className='controls'>
              <input type='text' id='name' placeholder='Name' defaultValue={this.props.event.name} ref='name' />
            </div>
          </div>
          <div className='control-group'>
            <label className='control-label' htmlFor='startDate'>Start Date</label>
            <div className='controls'>
              <input type='date' id='startDate' placeholder='startDate' defaultValue={this.props.event.startDate} ref='startDate' />
            </div>
          </div>
          <div className='control-group'>
            <label className='control-label' htmlFor='endDate'>End Date</label>
            <div className='controls'>
              <input type='date' id='endDate' placeholder='endDate' defaultValue={this.props.event.endDate} ref='endDate' />
            </div>
          </div>
          <div className='control-group'>
            <label className='control-label' htmlFor='description'>Description</label>
            <div className='controls'>
              <textarea rows='5' id='description' placeholder='description' defaultValue={this.props.event.description} ref='description' />
            </div>
          </div>
          <div className='control-group'>
            <label className='control-label' htmlFor='location'>Location</label>
            <div className='controls'>
              <input type='text' id='location' placeholder='location' defaultValue={this.props.event.location} ref='location' />
            </div>
          </div>
          <div className='control-group'>
            <label className='control-label' htmlFor='image'>Image URL</label>
            <div className='controls'>
              <input type='text' id='image' placeholder='image' defaultValue={this.props.event.image} ref='image' />
            </div>
          </div>
          <div className='control-group'>
            <label className='control-label' htmlFor='committee'>Committee</label>
            <div className='controls'>
              <select id='committee' defaultValue={this.props.event.committeeId} ref='committeeId'>
                {this.props.committees.data.map(committee => <option key={committee.id} value={committee.id}>{committee.name}</option>)}
              </select>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
