import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

import mathjs from 'mathjs';

const LEN_QUEUE = 3;

class App extends Component {

  state = {
    input: '',
    log: []
  };


  addInputToLog = (input) => {
    const log = this.state.log;

    if (log.length >= LEN_QUEUE)
      log.shift();

    log.push(input);
    this.setState({log});
  }

  removeLastInput = () => {
    const newInput = this.state.input.slice(0, -1);
    this.setState({input: newInput});
  }

  cleanAllInput = () => {
    this.setState({input: ''});
  }

  resolve = () => {
    if (!this.state.input)
      return;
    this.addInputToLog(this.state.input);
    try {
      const result = mathjs.eval(
        String(
          this
            .state
            .input
        ).replace('×','*')
          .replace('÷', '/')
      );
      this.setState({input: result});
    } catch (e) {
      this.setState({input: ''});
    }
  }

  addToInput = (ev) => {
    const character = ev.target.textContent;
    this.setState({input: this.state.input+character});
  }

  manuallyChangeInput = (ev) => {
    if (!this.state.input && !ev.target.value)
      return;
    this.setState({input: ev.target.value});
  }

  render() {
    return (
      <div className="application" ref={r => this.app = r}>
        <div className="log">
          {this.state.log.map((log, i) => (<div key={[log,i].join('_')} onClick={()=>this.setState({input:log})}>{log}</div>))}
        </div>
        <div className="calculator">
          <div className="display">
            <input
              id="expression"
              type="text"
              value={this.state.input}
              onChange={this.manuallyChangeInput}
              readOnly="true"
              aria-label="expression"
            />
          </div>
          <div className="mode-basic">
            <div className="operators-top container">
              <button onClick={this.removeLastInput}>&lt;</button>
              <button onClick={this.cleanAllInput}>C</button>
              <button onClick={this.addToInput}>÷</button>
              <button onClick={this.addToInput}>×</button>
            </div>
            <div className="container">
              <div className="num-pad">
                <div className="container">
                  <button onClick={this.addToInput}>7</button>
                  <button onClick={this.addToInput}>8</button>
                  <button onClick={this.addToInput}>9</button>
                </div>
                <div className="container">
                  <button onClick={this.addToInput}>4</button>
                  <button onClick={this.addToInput}>5</button>
                  <button onClick={this.addToInput}>6</button>
                </div>
                <div className="container">
                  <button onClick={this.addToInput}>1</button>
                  <button onClick={this.addToInput}>2</button>
                  <button onClick={this.addToInput}>3</button>
                </div>
                <div className="container num-pad-row-comma">
                  <button  onClick={this.addToInput}>0</button>
                  <button onClick={this.addToInput}>,</button>
                </div>
              </div>
              <div className="operators-right">
                <button onClick={this.addToInput}>-</button>
                <button onClick={this.addToInput}>+</button>
                <button onClick={this.resolve}>=</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
