import React from "react";
import "./style.css";

function Button({ label = "", onClick = () => {} } = {}) {
  // function handleInput(e) {
  //   onInput(e.target.value);
  // }

  return <button>{label}</button>;
}

export default Button;
