import React from "react";

class Counter extends React.Component {
  state = {
    count: 0,
  };
  decrement = () => {
    this.setState((oldState) => {
      return { count: oldState.count - 1 };
    });
  };
  increment = () => {
    this.setState((oldState) => {
      return { count: oldState.count + 1 };
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.decrement} aria-label="Decrement count">
          -
        </button>
        <span>Count is {this.state.count}</span>
        <button onClick={this.increment} aria-label="Increment count">
          +
        </button>
      </div>
    );
  }
}

export default Counter;
