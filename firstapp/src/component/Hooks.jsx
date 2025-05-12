import React, { useState, useEffect } from "react";

const Hooks = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(100);
  const [data, setData] = useState("b");

  useEffect(() => {
    console.log("usEffect called", `api/${count}/${data}`);
    setInterval(() => {
      console.log("interval called");
    }, 1000);
    return () => {
      console.log("called when component is off, demount");
    };
  });
  //   [] - component did mount
  //   [count] - call every state change

  return (
    <>
      <h1>Hooks</h1>
      <div>1.useState</div>
      <div>2.useEffect</div>
      <div>3.useRef</div>
      <div>4.useContext</div>
      <div>5.useMemo</div>
      <div>6.useCallback</div>

      <h2>count : {count}</h2>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        add
      </button>

      <h2>data:{data}</h2>
      <button
        onClick={() => {
          setData(data + "a");
        }}
      >
        Change data
      </button>

      <h2>data:{count2}</h2>
      <button
        onClick={() => {
          setCount2(count2 - 1);
        }}
      >
        decrease
      </button>
    </>
  );
};

export default Hooks;
