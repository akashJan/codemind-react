import React from "react";
import "./style.css";

function Button({ label = "", onClick = () => {}, dataOperation } = {}) {
  // function handleInput(e) {
  //   onInput(e.target.value);
  // }

  return (
    <button
      className="calc-button"
      data-operation={dataOperation}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
