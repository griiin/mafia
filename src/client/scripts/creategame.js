import View from './view';
import React from 'react';

class CreateGame extends View {
  render() {
    let viewClass = super.getViewClass(this.props.isVisible);
    return (
      <div className={viewClass}>
        <div className="Input">
          <label>Number of citizen: </label>
          <select>
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
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="Btn" onClick={this.props.goTo("waitingroom")}>Create</div>
      </div>
    );
  }
}

export default CreateGame;
