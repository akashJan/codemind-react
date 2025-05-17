import "./App.css";
import React, { useState } from "react";
// import SimpleCalculator from "./component/simpleCalculator/SimpleCalculator.jsx";
// import FunctionCom from "./component/FunctionCom";
import ClassCom from "./component/classCom/ClassCom";
import ComRender from "./component/condtnRendering/ComRender";
// import UserClass from "./component/classCom/UserClass";
// import ChildClass from "./component/classCom/ChildClass";

// import Hooks from "./component/Hooks";
// import RefHook from "./component/RefHooks";
// import Parent from "./component/hooks/Parent";
// import MyContext from "./component/utils/MyContext";

function App() {
  // const [isAuth, setIsAuth] = useState(true);

  // useContext
  // const data = ["akash", "aditi", "anshu", "ajay"];
  // const [user, setUser] = useState("abc");
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* <SimpleCalculator /> */}
      <ComRender />
      {/* <FunctionCom /> */}
      {/* <ClassCom isAuth={isAuth} abc="test" /> */}
      {/* <UserClass />
      <ChildClass /> */}

      {/* <Hooks /> */}
      {/* <RefHook /> */}
      {/* useContext */}
      {/* <button
        onClick={() => {
          setUser(
            data[count] ? data[count].toUpperCase() : data[0].toUpperCase()
          );
          setCount(count + 1);
        }}
      >
        Change user
      </button>
      <MyContext.Provider value={{ user, setUser, count, setCount }}>
        <Parent />
      </MyContext.Provider> */}
    </>
  );
}

export default App;
