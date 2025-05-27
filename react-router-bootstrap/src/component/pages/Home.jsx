import React from "react";
import Card from "react-bootstrap/Card";

const Home = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Card border="primary" style={{ width: "18rem", margin: "10px" }}>
            <Card.Header>Structural </Card.Header>
            <Card.Body>
              <Card.Title>HTML</Card.Title>
              <Card.Text>
                HTML, short for HyperText Markup Language, is the foundation of
                most websites. It's a markup language used to structure and
                present content on the web, defining the elements of a webpage
                like text, images, and links.
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
          <Card border="info" style={{ width: "18rem", margin: "10px" }}>
            <Card.Header>Presentational </Card.Header>
            <Card.Body>
              <Card.Title>CSS</Card.Title>
              <Card.Text>
                Cascading Style Sheets (CSS) is a stylesheet language used to
                describe the presentation of a document written in HTML or XML
                (including XML dialects such as SVG, MathML or XHTML).
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Card border="success" style={{ width: "18rem", margin: "10px" }}>
            <Card.Header>Behavioral </Card.Header>
            <Card.Body>
              <Card.Title>JavaScript</Card.Title>
              <Card.Text>
                JavaScript is a versatile programming language primarily used to
                add interactivity and dynamic behavior to websites, making web
                pages more engaging and user-friendly
              </Card.Text>
            </Card.Body>
          </Card>
          <br />

          <Card border="warning" style={{ width: "18rem", margin: "10px" }}>
            <Card.Header>Library </Card.Header>
            <Card.Body>
              <Card.Title>React Js</Card.Title>
              <Card.Text>
                JavaScript is a versatile programming language primarily used to
                add interactivity and dynamic behavior to websites, making web
                pages more engaging and user-friendly
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
        </div>
      </div>
    </>
  );
};

export default Home;
