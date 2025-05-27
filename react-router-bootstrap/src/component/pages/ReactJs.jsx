import React from "react";
import { Routes, Route } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

// import ReactHome from "../pages-reactJs/ReactHome";
import ReactNavbar from "../pages-reactJs/ReactNavbar";
import Intro from "../pages-reactJs/Intro";
import Jsx from "../pages-reactJs/Jsx";
import Props from "../pages-reactJs/Props";
import Routing from "../pages-reactJs/Routing";
// import Error from "../common/Error";

const ReactJs = () => {
  return (
    <>
      <div className="row">
        <ReactNavbar />
        <div className="col-md-8">
          <Routes>
            {/* <Route path="/reactHome " element={<ReactHome />} /> */}
            <Route index path="/intro" element={<Intro />} />
            <Route path="/jsx" element={<Jsx />} />
            <Route path="/props" element={<Props />} />
            <Route path="/routing" element={<Routing />} />
            {/* <Route path="/reactJs/*" element={<Error />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default ReactJs;
