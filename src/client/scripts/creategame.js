import View from './view';
import React from 'react';

class CreateGame extends View {
  constructor() {
    super()
    this.createGame = this.createGame.bind(this);
    this.state = {
      nbCitizen: 1,
      nbMafia: 1,
      disabled: false
    };
  }
  createGame() {
    if (!this.state.disabled) {
      this.state.disabled = true;
      this.setState(this.state);
      this.props.socket.emit('createGame', {nbCitizen: this.state.nbCitizen, nbMafia: this.state.nbMafia});
    }
  }
  nbCitizenChange(e) {
    this.state.nbCitizen = e.target.value;
    this.setState(this.state);
  }
  nbMafiaChange(e) {
    this.state.nbMafia = e.target.value;
    this.setState(this.state);
  }
  render() {
    const viewClass = super.getViewClass(this.props.isVisible);
    return (
      <div className={viewClass}>
        <div className="Input">
          <label>Number of citizen: </label>
          <select value={this.state.nbCitizen} onChange={::this.nbCitizenChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>
        <div className="Input">
          <label>Number of mafia: </label>
          <select value={this.state.nbMafia} onChange={::this.nbMafiaChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="Btn" onClick={::this.createGame} >Create</div>
      </div>
    );
  }
}

export default CreateGame;
