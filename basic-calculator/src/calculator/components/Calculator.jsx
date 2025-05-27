import React, { useState } from "react";
import "./style.css";
import Input from "./input/Input";
import Button from "./button/Button";

const Add = "+";
const Subtract = "-";
const Divide = "/";
const Multiply = "*";
const Equal = "=";

const Operations = [Add, Subtract, Divide, Multiply, Equal];
// const Nums = [...new Array(10)];

function Calculator() {
  const [operandA, setOperandA] = useState("");
  const [operandB, setOperandB] = useState("");
  const [result, setResult] = useState("");
  const [operation, setOperation] = useState("");
  const [currentNumber, setCurrentNumber] = useState("");

  const Nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  function onInput(value) {
    if (operandA) {
      if (!operandB) {
        const lastChar = value.split("").at(-1);
        setOperandB(lastChar);
        setCurrentNumber(lastChar);
      } else {
        setCurrentNumber(value);
        setOperandB(Number(value));
      }
    } else {
      setCurrentNumber(value);
    }
  }

  function handleNumberClick(number) {
    return () => {
      const newValue = `${currentNumber}${number}`;

      if (operandA) {
        if (!operandB) {
          setOperandB(Number(number));
          setCurrentNumber(number);
        } else {
          setCurrentNumber(newValue);
          setOperandB(Number(newValue));
        }
      } else {
        setCurrentNumber(newValue);
      }
    };
  }

  function handleOperationSelect(type) {
    return () => {
      // setOperation(type);
      if (type === Equal) {
        let res = 0;
        setOperation("");
        if (operation === Add) {
          res = operandA + operandB;
        } else if (operation === Subtract) {
          res = operandA - operandB;
        } else if (operation === Multiply) {
          res = operandA * operandB;
        } else if (operation === Divide) {
          res = operandA / operandB;
        }

        setResult(res);
        setCurrentNumber(String(res));
        setOperandA(res);
        setOperandB("");
        setOperation("");
      } else {
        setOperandA(Number(currentNumber));
        setCurrentNumber("");
        setOperation(type);
      }
    };
  }

  return (
    <div className="calculator">
      <Input
        value={currentNumber}
        placeholder="Enter Number"
        onInput={onInput}
      />
      <div className="number-pad">
        {Nums.map((val, index) => {
          return (
            <Button
              onClick={handleNumberClick(val)}
              key={index}
              label={val}
            ></Button>
          );
        })}
      </div>
      <div className="result">Select Operation : {operation}</div>

      <div className="operation-bar">
        {Operations.map((o) => {
          return (
            <Button
              onClick={handleOperationSelect(o)}
              key={o}
              label={o}
            ></Button>
          );
        })}
      </div>
      <div className="result">Result: {result}</div>
    </div>
  );
}

export default Calculator;
