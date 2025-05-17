import React, { Component } from "react";

export default class ChildClass extends Component {
  constructor() {
    super();
    console.log("constructor child");
  }

  componentWillUnmount() {
    console.log("child unmount ");
  }
  render() {
    console.log("child render called");
    return <div>ChildClass</div>;
  }
}
