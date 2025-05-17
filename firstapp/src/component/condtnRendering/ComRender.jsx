import React, { useState } from "react";
import NormalComponent from "./NormalComponent";
// import Greet from "../Greet";

import Greet from "./Greet";
const ConRender = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [showMessage, setShowMessage] = useState("");

  //conditional rendering
  //1.if else 2.switch case 3.logical && 4.ternary operation
  return (
    <>
      <div>Conditional Rendering Component</div>
      {/* <Greet isAuth={isAuth} /> */}

      {isAuth && <h1>Welcome !!!!</h1>}
      {!isAuth && <h1>Sign Up !!!!</h1>}
      {/* {isAuth ? <h1>Welcome!!!!</h1> : <h1>Sign Up !!!!</h1>} */}
      <h1>{showMessage}</h1>
      {/* <NormalComponent isAuth={isAuth} abc="test" /> */}
    </>
  );
};

export default ConRender;
