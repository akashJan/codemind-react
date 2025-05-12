import React, { useState } from "react";

const FunctionalComponent = ({ abc }) => {
  const [count, setCount] = useState(10);
  const [user, setUser] = useState("codemind");
  const handleClick = () => {
    setCount(count + 1);
    setUser(user + " developer");
  };
  const handleDecrement = (val) => {
    setCount(count - val);
  };
  // let count = 10;
  return (
    <>
      <div>I am from functional component. : {abc}</div>
      <div>count: {count}</div>
      <button onClick={handleClick}>Increment</button>
      <button
        onClick={() => {
          handleDecrement(3);
        }}
      >
        Decrement
      </button>
      <div>user: {user}</div>
    </>
  );
};

export default FunctionalComponent;
