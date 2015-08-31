import View from './view';
import React from 'react';

class JoinGame extends View {
  render() {
    let viewClass = super.getViewClass(this.props.isVisible);
    return (
      <div className={viewClass}>
        <div className="Input">
          <label>Code: </label>
          <input type="text" />
        </div>
        <div className="Input">
          <label>Name: </label>
          <input type="text" />
        </div>
        <div className="Btn" onClick={this.props.goTo("waitingroom")}>Join</div>
      </div>
    );
  }
}

export default JoinGame;
