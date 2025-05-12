import "./App.css";
import react, { useState } from "react";
// import FunctionCom from "./component/functionCom";
// import ClassCom from "./component/classCom";
// import SimpleCalculator from "./component/simpleCalculator/SimpleCalculator.jsx";
// import MathOperations from "./component/MathOperations.jsx";
import Navbar from "./component/webPageComp/navbar";
import Home from "./component/webPageComp/Home";
import About from "./component/webPageComp/About";
import Contact from "./component/webPageComp/Contact";
import Footer from "./component/webPageComp/Footer";
// import Hooks from "./component/Hooks";
// import RefHook from "./component/RefHooks";
// import ParentComponent from "./component/ParentCom";
// import MyContext from "./component/utils/MyContext";
// import Greet from "./component/Greet";

import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";

function App() {
  const [isAuth, setIsAuth] = useState(10);
  const [showMessage, setShowMessage] = useState("");
  const [user, setUser] = useState("abc");
  const data = ["akash", "aditi", "anshu", "ajay"];
  const [count, setCount] = useState(0);
  //conditional rendering
  //1.if else 2.switch case 3.logical && 4.ternary operation
  return (
    <Routers>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
      <Footer />
      {/* <FunctionCom />
      <ClassCom /> */}
      {/* <SimpleCalculator />
      <MathOperations /> */}
      {/* <Hooks /> */}
      {/* <RefHook /> */}

      {/* <button onClick={() => {setUser(data[count] ? data[count].toUpperCase() : data[0].toUpperCase()); setCount(count+1);}}>Change user</button>
    <MyContext.Provider value={{user, setUser, count, setCount}}>
    <ParentComponent/>
    </MyContext.Provider> */}
    </Routers>
  );
}

export default App;
