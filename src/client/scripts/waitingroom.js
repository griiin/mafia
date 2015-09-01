import View from './view';
import React from 'react';

class WaitingRoom extends View {
  constructor() {
    super()
    this.state = {
      ellipsis: '...',
      currentPlayerNb: 0
    }
  }
  componentDidMount() {
    setInterval(() => {
      switch (this.state.ellipsis) {
        case '':
          this.state.ellipsis = '.';
          break;
        case '.':
          this.state.ellipsis = '..';
          break;
        case '..':
          this.state.ellipsis = '...';
          break;
        default:
          this.state.ellipsis = '';
          break;
      }
      if (!this.state.currentPlayerNb) {
        this.state.currentPlayerNb = this.props.currentPlayerNb;
      }
      this.setState(this.state);
    }, 1000);
    this.props.socket.on('newPlayer', (data) => {
      this.state.currentPlayerNb = data.currentPlayerNb;
      this.setState(this.state);
    });
  }
  render() {
    let viewClass = super.getViewClass(this.props.isVisible);
    return (
      <div className={viewClass}>
        <div className="PasswordWrapper">
          Code: <span className="PasswordWrapper--Password">{this.props.id}</span>
        </div>
        <div>
          Player {this.state.currentPlayerNb}/{this.props.maxPlayerNb}
        </div>
        <div>
          Waiting new players{this.state.ellipsis}
          </div>
        </div>
    );
  }
}

export default WaitingRoom;
