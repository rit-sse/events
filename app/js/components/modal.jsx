'use strict';

import React from 'react';
import classnames from 'classnames';

export default class Modal extends React.Component {

  render() {
    return(
      <div className={classnames('modal', { hide: !this.props.show })}>
        <div className='modal-header'>
          <button type='button' className='close' aria-hidden='true' onClick={this.props.close}>&times;</button>
          <h3>{this.props.header}</h3>
        </div>
        <div className='modal-body'>
          {this.props.children}
        </div>
        <div className='modal-footer'>
          <a href='#' className='btn' onClick={this.props.close}>{this.props.closeText}</a>
          <a href='#' className='btn btn-primary' onClick={this.props.submit} >{this.props.submitText}</a>
        </div>
      </div>
    );
  }
}
