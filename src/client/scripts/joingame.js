import View from './view';
import React from 'react';

class JoinGame extends View {
  constructor() {
    super()
    this.state = {};
    this.isActive = true;
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  tryToJoin() {
    const id = parseInt(this.state.code);
    if (!id || id === 0) {
      this.state.errorMsg = "You have to provide a code";
      this.setState(this.state);
      return;
    }
    if (!this.state.name) {
      this.state.errorMsg = "You have to provide a name";
      this.setState(this.state);
      return;
    }
    if (this.isActive) {
      this.state.errorMsg = "";
      this.setState(this.state);
      this.isActive = false;
      this.props.socket.emit('joinGame', {
        gameId: this.state.code,
        name: this.state.name
      });
    }
  }
  componentDidMount() {
    this.props.socket.on('joinGameFailed', (data) => {
      this.state.errorMsg = data.message;
      this.setState(this.state);
      this.isActive = true;
    })
  }
  codeValueChange(e) {
    this.state.code = e.target.value;
    this.setState(this.state);
  }
  nameValueChange(e) {
    this.state.name = e.target.value;
    this.setState(this.state);
  }
  render() {
    let viewClass = super.getViewClass(this.props.isVisible);
    return (
      <div className={viewClass}>
        <div className="Input">
          <label>Code: </label>
          <input type="text" value={this.state.code} onChange={::this.codeValueChange}/>
        </div>
        <div className="Input">
          <label>Name: </label>
          <input type="text" value={this.state.name} onChange={::this.nameValueChange} />
        </div>
        <div className="Error">{this.state.errorMsg}</div>
        <div className="Btn" onClick={::this.tryToJoin}>Join</div>
      </div>
    );
  }
}

export default JoinGame;
