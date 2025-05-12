import React from "react";

const MathOperations = () => {
  const multiply = (num1, num2) => {
    let result = num1 * num2;
    return result;
  };
  let res = multiply(5, 3);
  return (
    <>
      <h3>Math Operations</h3>
      <p>Multiplication of 5 and 3 is : {res}</p>
      <p>Multiplication of 7 and 2 is : {res}</p>
    </>
  );
};

export default MathOperations;
