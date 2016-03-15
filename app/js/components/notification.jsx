import React from 'react';

export default class Notification extends React.Component {

  render() {
    if (this.props.notice) {
      return  (
        <div className={`alert alert-${this.props.alertType}`}>
          {this.props.notice.message}
        </div>
      );
    }
    return <span />;
  }
}
