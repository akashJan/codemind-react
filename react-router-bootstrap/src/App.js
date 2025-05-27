import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavbarCom from "./component/NavbarCom";
import Home from "./component/pages/Home";
import HTML from "./component/pages/HTML";
import CSS from "./component/pages/CSS";
import JavaScript from "./component/pages/JavaScript";
import ReactJs from "./component/pages/ReactJs";
import Error from "./component/common/Error";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Router>
        <NavbarCom />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/html" element={<HTML />} />
          <Route path="/css" element={<CSS />} />
          <Route path="/javaScript" element={<JavaScript />} />
          <Route path="/reactJs/*" element={<ReactJs />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
