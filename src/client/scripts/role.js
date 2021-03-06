import View from './view';
import React from 'react';

class Role extends View {
  render() {
    let viewClass = super.getViewClass(this.props.isVisible);
    return (
      <div className={viewClass}>
        <div className={this.props.role !== 'mafia' ? 'u-hidden' : 'u-visible'}>
          <div>
            <svg className="Fedora" viewBox="0 0 300 300">
              <path fill="#463006" d="M56.4,154.8c0,0-50,12.4-50,29.1s54.3,45.1,140.9,46.5s146.5-39.7,138-52.9c-8.5-13.1-68.1-25.9-68.1-25.9
                L56.4,154.8z"/>
              <path fill="#463006" d="M57,146l8.6-53.6c0,0,9.2-17,48.6-13.5c2.2,0.2,10.4-10.2,47.4-10.2s44.8,20.8,44.8,20.8l16.3,54.6
                l1.2,11.7l-63.3,24.5L57,162.6V146z"/>
              <path fill="#A61300" d="M57,146v31c0,0,102.3,41.7,167.6-3c0.7-17-2.1-28-2.1-28S133.9,183.3,57,146z"/>
            </svg>
          </div>
          You are Mafia
        </div>
        <div className={this.props.role === 'mafia' ? 'u-hidden' : 'u-visible'}>
          <div>
            <svg viewBox="0 0 300 300">
              <path fill="#463006" d="M235.6,167l-15-2c-3.8-0.7-9,4.2-9.1,10.4c-0.1,6.2,1.8,9.8,4.9,10.7c3.1,0.9,17.8,0.6,17.2,2.9
                s-24.7,1.6-24.7,1.6l-59,0.2l-59.2-0.2c0,0-24.2,0.7-24.8-1.6s14.1-2,17.2-2.9c3.1-0.9,5-4.4,4.9-10.7c-0.1-6.2-5.3-11.1-9.1-10.4
                l-15,2c0,0-22.4,2.7-22.4,23c0,22.4,33.4,21,33.4,21h75h74.6c0,0,33.4,1.4,33.4-21C258,169.7,235.6,167,235.6,167z"/>
              <polygon fill="#2A5C2D" points="150,162 90,162 90,192 150,192 210,192 210,162 	"/>
              <path fill="#463006" d="M150,88.3C93,88.6,90,141,90,141v21h60h60v-21C210,141,207,88.6,150,88.3z"/>
            </svg>
          </div>
          You are Citizen
        </div>
      </div>
    );
  }
}

export default Role;
