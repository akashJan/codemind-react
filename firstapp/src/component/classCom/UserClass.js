import React, { Component } from "react";
import ChildClass from "./ChildClass";

class UserClass extends Component {
  constructor(props) {
    super(props);
    console.log("constructor method called");
    this.state = {
      user: {},
    };
  }

  async componentDidMount() {
    console.log("componentDid mount");
    //api call
    const data = await fetch("https://api.github.com/users/suchita96");
    const json = await data.json();
    this.setState({ user: json });
    console.log(json);
  }

  componentDidUpdate(prevState) {
    console.log("user state changes");
  }

  componentWillUnmount() {
    console.log("component unmount called");
  }

  render() {
    console.log("render called");

    return (
      <>
        <div>User class component {this.state.user.login}</div>
        <ChildClass />
      </>
    );
  }
}

export default UserClass;
