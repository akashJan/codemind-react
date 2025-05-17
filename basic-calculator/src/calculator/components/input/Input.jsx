import React from "react";
import "./style.css";

function Input({ placeholder = "", onInput = () => {} } = {}) {
  function handleInput(e) {
    onInput(e.target.value);
  }

  return <input onInput={handleInput} placeholder=""></input>;
}

export default Input;
