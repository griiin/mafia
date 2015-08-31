import View from './view';
import React from 'react';

class Dashboard extends View {
  render() {
    let viewClass = super.getViewClass(this.props.isVisible);
    return (
      <div className={viewClass}>
        <div className="Btn" onClick={this.props.goTo('creategame')}>Create Game</div>
        <div className="Btn" onClick={this.props.goTo('joingame')}>Join Game</div>
      </div>
    );
  }
}

export default Dashboard;
