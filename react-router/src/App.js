import React from "react";
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";

import Navbar from "./component/navbar";
import Home from "./component/Home";
import About from "./component/About";
import Contact from "./component/Contact";
// import Footer from "./component/Footer";

const App = () => {
  return (
    <Routers>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
      {/* <Footer /> */}
    </Routers>
  );
};

export default App;
