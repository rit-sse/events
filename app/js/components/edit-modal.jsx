'use strict';

import React from 'react';
import Modal from './modal';

export default class EditModal extends React.Component {

  render() {
    return(
      <Modal
        show={this.props.show}
        close={this.props.close}
        closeText='No'
        submitText='Yes'
        header='Edit event'
        submit={this.props.edit}
      >
        <div className='form-horizontal'>
          <div className='control-group'>
            <label className='control-label' htmlFor='name'>Name</label>
            <div className='controls'>
              <input type='text' id='name' placeholder='Name' />
            </div>
          </div>
          <div className='control-group'>
            <label className='control-label' htmlFor='startDate'>startDate</label>
            <div className='controls'>
              <input type='date' id='startDate' placeholder='startDate' />
            </div>
          </div>
          <div className='control-group'>
            <label className='control-label' htmlFor='endDate'>endDate</label>
            <div className='controls'>
              <input type='date' id='endDate' placeholder='endDate' />
            </div>
          </div>
          <div className='control-group'>
            <label className='control-label' htmlFor='description'>description</label>
            <div className='controls'>
              <textarea rows='5' id='description' placeholder='description' />
            </div>
          </div>
          <div className='control-group'>
            <label className='control-label' htmlFor='location'>location</label>
            <div className='controls'>
              <input type='text' id='location' placeholder='location' />
            </div>
          </div>
          <div className='control-group'>
            <label className='control-label' htmlFor='image'>image</label>
            <div className='controls'>
              <input type='text' id='image' placeholder='image' />
            </div>
          </div>
          <div className='control-group'>
            <label className='control-label' htmlFor='committee'>committee</label>
            <div className='controls'>
              <select id='committee'>
                {this.props.committees.data.map(committee => <option value={committee.id}>{committee.name}</option>)}
              </select>
            </div>
          </div>
          <div className='control-group'>
            <div className='controls'>
              <button type='submit' className='btn'>Sign in</button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
