import React from "react";
import "./style.css";

function Input({ placeholder = "", onInput = () => {}, value = "" } = {}) {
  function handleInput(e) {
    onInput(e.target.value);
  }

  return (
    <input
      className="calc-input"
      value={value}
      onInput={handleInput}
      placeholder={placeholder}
      type="text"
    />
  );
}

export default Input;
