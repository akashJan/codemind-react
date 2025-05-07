import React, { useState } from "react";

const FunctionCom = () => {
  const [count, setCount] = useState(10);
  const [user, setUser] = useState("akash");

  const handleCount = () => {
    setCount(count + 1);
  };
  const addName = () => {
    let name = "Akash Jan";
    setUser(name);
  };
  return (
    <>
      <h1>Increment</h1>
      <p>Count:{count}</p>
      <button onClick={handleCount}>Increment</button>
      <p onClick={addName}>Add Name: {user}</p>
    </>
  );
};

export default FunctionCom;
