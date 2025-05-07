import React from "react";
import "../simpleCalculator/sC.css";

const calculation = () => {
  const a = 25;
  const b = 13;
  const add = a + b;
  const diff = a - b;
  const product = a * b;
  const division = a / b;
  return (
    <>
      <div>
        <h1>Simple Calculation</h1>
        <div class="container">
          <h4>
            Input 1 is : {a} & Input 2 is : {b}
          </h4>
          <h4>Sum is : ${add}</h4>
          <h4>Difference is : ${diff}</h4>
          <h4>Product is : ${product}</h4>
          <h4>Division is : ${division}</h4>
        </div>
      </div>
    </>
  );
};

export default calculation;
