import React from 'react';
import Modal from './modal';
import '../bootstrap-datetimepicker';
import moment from 'moment-timezone';

export default class FormModal extends React.Component {

  constructor() {
    super();
    this.state = {};
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const options = {
      pickSeconds: false,
      pick12HourFormat: true,
    };

    const startPicker = $(`#start-date-${this.props.event.id}`).datetimepicker(options).data('datetimepicker');
    const endPicker = $(`#end-date-${this.props.event.id}`).datetimepicker(options).data('datetimepicker');

    this.setState({
      startPicker,
      endPicker,
    });

    const date = new Date();

    startPicker.setLocalDate(new Date(this.props.event.startDate) || date);
    endPicker.setLocalDate(new Date(this.props.event.endDate) || date.setHours(date.getHours() + 1));
  }

  submit() {
    const event = ['name', 'description', 'location', 'image', 'committeeName']
      .reduce((prev, key) => {
        prev[key] = this.refs[key].getDOMNode().value || null;
        return prev;
      }, {});

    event.startDate = moment.tz(this.state.startPicker.getLocalDate(), 'America/New_York').utc().toDate();
    event.endDate = moment.tz(this.state.endPicker.getLocalDate(), 'America/New_York').utc().toDate();
    this.props.submit(event);
  }

  render() {
    return (
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
              <div className='datetimepicker input-append date' id={`start-date-${this.props.event.id}`} ref='startDate'>
                <input data-format='yyyy-MM-dd HH:mm PP' type='text'/>
                <span className='add-on'>
                  <i data-time-icon='fa fa-clock-o' data-date-icon='fa fa-calendar'></i>
                </span>
              </div>
            </div>
          </div>
          <div className='control-group'>
            <label className='control-label' htmlFor='endDate'>End Date</label>
            <div className='controls'>
              <div className='datetimepicker input-append date' id={`end-date-${this.props.event.id}`} ref='endDate'>
                <input data-format='yyyy-MM-dd HH:mm PP' type='text' />
                <span className='add-on'>
                  <i data-time-icon='fa fa-clock-o' data-date-icon='fa fa-calendar'></i>
                </span>
              </div>
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
              <select id='committee' defaultValue={this.props.event.committeeName} ref='committeeName'>
                {this.props.committees.map(committee => <option key={committee.name} value={committee.name}>{committee.name}</option>)}
              </select>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
