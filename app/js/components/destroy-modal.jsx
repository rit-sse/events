'use strict';

import React from 'react';
import Modal from './modal';

export default class DestroyModal extends React.Component {

  render() {
    return(
      <Modal
        show={this.props.show}
        close={this.props.close}
        closeText='No'
        submitText='Yes'
        header=''
        submit={this.props.destroy}
      >
        <p>Are You Sure?</p>
      </Modal>
    );
  }
}
