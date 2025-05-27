import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavbarCom() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">CodeMind Tutorial</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/html">HTML</Nav.Link>
            <Nav.Link href="/css">CSS</Nav.Link>
            <Nav.Link href="/javaScript">JavaScript</Nav.Link>
            <Nav.Link href="/reactJs">React Js</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarCom;
