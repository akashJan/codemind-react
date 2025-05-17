import React from "react";
import "./style.css";
import Input from "./input/Input";
import Button from "./button/Button";

function Calculator() {
  function onInput(value) {
    console.log(value);
  }

  function handleClick() {
    console.log("handleClick");
  }
  return (
    <div>
      <Input placeholder="Enter Number" onInput={onInput} />
      <Button label="Add" onClick={handleClick}>
        Click
      </Button>
    </div>
  );
}

export default Calculator;
