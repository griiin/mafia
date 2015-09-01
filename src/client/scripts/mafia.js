import React from 'react';
import Dashboard from './dashboard';
import CreateGame from './creategame';
import JoinGame from './joingame';
import WaitingRoom from './waitingroom';
import Role from './role';
import Monitor from './monitor';

class Mafia extends React.Component {
  constructor() {
    super()
    this.goTo = this.goTo.bind(this);
    this.getViewState = this.getViewState.bind(this);
    this.goToFactory = this.goToFactory.bind(this);
    this.socket = io('http://localhost:4000');
    this.state = {
      players: [],
      views: {
      'dashboard': true,
      'joingame': false,
      'creategame': false,
      'waitingroom': false,
      'role': false,
      'monitor': false
    }};
  }
  goTo(viewName) {
    Object.keys(this.state.views).forEach(key => this.state.views[key] = false);
    this.state.views[viewName] = true;
    this.forceUpdate();
  }
  goToFactory(viewName) {
    return () => this.goTo(viewName);
  }
  getViewState(viewName) {
    return (this.state && this.state.views) ? this.state.views[viewName] : false;
  }
  componentDidMount() {
    this.socket.on('createGameResult', (data) => {
      this.state.id = data.id;
      this.state.maxPlayerNb = data.maxPlayerNb;
      this.state.currentPlayerNb = 0;
      this.setState(this.state);
      this.goTo('waitingroom');
    });
    this.socket.on('joinGameSuccess', (data) => {
      this.state.id = data.id;
      this.state.maxPlayerNb = data.maxPlayerNb;
      this.state.currentPlayerNb = data.currentPlayerNb;
      this.setState(this.state);
      this.goTo('waitingroom');
    });
    this.socket.on('startMonitorGame', (data) => {
      this.state.players = data.players;
      this.setState(this.state);
      console.log(data);
      this.goTo('monitor');
    });
    this.socket.on('startGame', (data) => {
      console.log("=>", data);
      this.state.role = data.role;
      this.setState(this.state);
      console.log("=>", data);
      this.goTo('role');
    });
  }
  render() {
    return (
      <div>
        <h1>Mafia</h1>
        <Dashboard isVisible={this.getViewState('dashboard')} goTo={this.goToFactory} />
        <CreateGame isVisible={this.getViewState('creategame')} goTo={this.goToFactory} socket={this.socket} />
        <JoinGame isVisible={this.getViewState('joingame')} goTo={this.goToFactory} socket={this.socket}/>
        <WaitingRoom isVisible={this.getViewState('waitingroom')} goTo={this.goToFactory} id={this.state.id} maxPlayerNb={this.state.maxPlayerNb} currentPlayerNb={this.state.currentPlayerNb} socket={this.socket}/>
        <Role isVisible={this.getViewState('role')} role={this.state.role} />
        <Monitor isVisible={this.getViewState('monitor')} players={this.state.players} />
      </div>
    );
  }
}

export default Mafia;
