import View from './view';
import React from 'react';

class WaitingRoom extends View {
  render() {
    let viewClass = super.getViewClass(this.props.isVisible);
    return (
      <div className={viewClass}>
        <div className="PasswordWrapper">
          Code: <span className="PasswordWrapper--Password">XxXXX</span>
        </div>
        <div>
          Waiting...
        </div>
        <div className="Btn" onClick={this.props.goTo("monitor")}>Start</div>
        <div className="Btn" onClick={this.props.goTo("role")}>Wait</div>
      </div>
    );
  }
}

export default WaitingRoom;
