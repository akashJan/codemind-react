import React from "react";
import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import Container from "react-bootstrap/Container";
import "./customDiv.css";
const ReactNavbar = () => {
  return (
    <>
      {/* <Container>
        <Navbar data-bs-theme="dark">
          <Container>
            <Nav>
              <Nav.Link href="/reactJs/reactHome">React Home</Nav.Link>
              <Nav.Link href="/reactJs/intro">React Introduction</Nav.Link>
              <Nav.Link href="/reactJs/jsx">React JSX</Nav.Link>
              <Nav.Link href="/reactJs/props">React Props</Nav.Link>
              <Nav.Link href="/reactJs/routing">React Routing</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </Container> */}

      <div className="col-md-2 customDiv">
        <ul className="list">
          <li>
            <Nav.Link className="n-l" href="/reactJs/reactHome  ">
              React Home
            </Nav.Link>
          </li>
          <li>
            <Nav.Link className="n-l" href="/reactJs/intro">
              React Introduction
            </Nav.Link>
          </li>
          <li>
            <Nav.Link className="n-l" href="/reactJs/jsx">
              React JSX
            </Nav.Link>
          </li>
          <li>
            <Nav.Link className="n-l" href="/reactJs/props">
              React Props
            </Nav.Link>
          </li>
          <li>
            <Nav.Link className="n-l" href="/reactJs/routing">
              React Routing
            </Nav.Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ReactNavbar;
