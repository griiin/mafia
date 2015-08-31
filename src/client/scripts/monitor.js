import View from './view';
import React from 'react';

class Monitor extends View {
  render() {
    let viewClass = super.getViewClass(this.props.isVisible);
    return (
      <div className={viewClass}>
        <div>
          xx is Citizen
        </div>
        <div>
          xx is Mafia
        </div>
      </div>
    );
  }
}

export default Monitor;
