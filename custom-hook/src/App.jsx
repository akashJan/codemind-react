import React from "react";
import "./App.css";
import useToggle from "./useToggle";

const App = () => {
  const [value, toggleValue] = useToggle(true);
  return (
    <div className="container">
      {value ? <h1>Custom Hooks</h1> : ""}
      <div>
        <button onClick={toggleValue}>Toggle Heading</button>
        <button onClick={() => toggleValue(true)}>Show Heading</button>
        <button onClick={() => toggleValue(false)}>Hide Heading</button>
      </div>
    </div>
  );
};

export default App;
