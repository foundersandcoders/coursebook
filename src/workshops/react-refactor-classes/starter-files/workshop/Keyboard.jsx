import React from "react";

class Keyboard extends React.Component {
  state = {
    key: "",
  };
  handleKeyDown = (event) => {
    this.setState({ key: event.key });
  };
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    // stops the event listener continuing to fire
    // when the component has left the page
    window.removeEventListener("keydown", this.handleKeyDown);
  }
  render() {
    return <div>{this.state.key || "Press any key"}</div>;
  }
}

export default Keyboard;
