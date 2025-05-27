import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { decrement, increment } from "./components/CounterReducer";
// import Navbar from "./components/Navbar";

const App = () => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.counter);
  return (
    <>
      {/* <Navbar /> */}

      <h2 style={{ margin: "10px" }}>Value : {value}</h2>
      <button
        style={{ padding: "10px", margin: "10px" }}
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <button
        style={{ padding: "10px", margin: "10px" }}
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </>
  );
};

export default App;
