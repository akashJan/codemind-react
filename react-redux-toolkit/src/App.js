import React from "react";
import { useSelector } from "react-redux";

const App = () => {
  const cart = useSelector((state) => state.counter);
  return (
    <div>
      <ul>
        <li>cart : {cart}</li>
      </ul>
    </div>
  );
};

export default App;
