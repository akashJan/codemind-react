import React, { Component } from "react";

export default class ClassComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      propValue: this.props.isAuth ? "Success" : "Failure",
    };
  }
  render() {
    return (
      <>
        <h3>class component : {this.props.abc} </h3>
        <h1>{this.state.propValue}</h1>
        <div>count : {this.state.count}</div>
        <button
          onClick={() => {
            this.setState({ count: this.state.count + 1 });
          }}
        >
          click
        </button>
      </>
    );
  }
}
