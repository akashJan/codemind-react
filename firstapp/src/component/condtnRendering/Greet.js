const Greet = ({ isAuth }) => {
  // If-else case example
  if (isAuth) {
    return <h1>Welcome!!</h1>;
  } else {
    return <h1>Sign up</h1>;
  }

  // Switch case example
  // switch (Number(isAuth) > 15) {
  //   case true:
  //     return <h1>greater than 15</h1>;
  //   case false:
  //     return <h1>leaser than 15</h1>;
  //   default:
  //     return <h1>No case matching</h1>;
  // }
};

export default Greet;
