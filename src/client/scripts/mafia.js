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
  }
  getInitialState() {
    return {
      views: {}
    };
  }
  componentDidMount() {
    this.setState({
      views: {
      'dashboard': true,
      'joingame': false,
      'creategame': false,
      'waitingroom': false,
      'role': false,
      'monitor': false
    }});
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
  render() {
    return (
      <div>
        <h1>Mafia</h1>
        <Dashboard isVisible={this.getViewState('dashboard')} goTo={this.goToFactory} />
        <CreateGame isVisible={this.getViewState('creategame')} goTo={this.goToFactory} />
        <JoinGame isVisible={this.getViewState('joingame')} goTo={this.goToFactory} />
        <WaitingRoom isVisible={this.getViewState('waitingroom')} goTo={this.goToFactory} />
        <Role isVisible={this.getViewState('role')} goTo={this.goToFactory} />
        <Monitor isVisible={this.getViewState('monitor')} goTo={this.goToFactory} />
      </div>
    );
  }
}

export default Mafia;
