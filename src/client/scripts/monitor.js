import View from './view';
import React from 'react';

class Monitor extends View {
  render() {
    let viewClass = super.getViewClass(this.props.isVisible);
    var players = this.props.players.map((player) => {
      return (
        <div>
        <span className="Player--Name">{player.name}</span>
        is
        <span className="Player--Role">{player.role}</span>
        </div>
      );
    });
    return (
      <div className={viewClass}>
        {players}
      </div>
    );
  }
}

export default Monitor;
