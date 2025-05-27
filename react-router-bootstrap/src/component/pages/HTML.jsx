import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import img from "../../assets/videoTag.png";
const HTML = () => {
  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Non-Semantic Elements:</Accordion.Header>
          <Accordion.Body>
            {"<div>"}, {"<span>"}, {"<h2>"}, {"<i>"}, {"<u>"}, {"<a></a>"}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Semantic Elements:</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                {"<table>"} and {"<form>"}{" "}
              </li>
              <li>
                {"<details>"} and {"<summary>"}{" "}
              </li>
              <li>
                {"<video>"} and {"<audi0>"}{" "}
              </li>
              <li>{"<nav>"} </li>
              <li>{"<header>"} </li>
              <li>{"<footer>"} </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Block Element:</Accordion.Header>
          <Accordion.Body>
            A block level element always starts on a new line and takes up the
            full width available. Example: {"<h2>"}, {"<pre>"}, {"<ul>"},
            {"<header>"}, {"</header>"}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Inline Element:</Accordion.Header>
          <Accordion.Body>
            An inline element does not start on a new line and only takes up as
            much width as necessary Example. {"<span>"}, {"<b>"}, {"<a>"},
            {"<sub>"}, {"<textarea>"}, {"<img></img>"}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Card
        className="bg-dark text-white"
        style={{ height: "300px", width: "500px", margin: "20px" }}
      >
        <Card.Img
          src={img}
          style={{ height: "300px", width: "500px" }}
          alt="Card image"
        />
        <Card.ImgOverlay>
          <Card.Title>How to insert youtube video</Card.Title>
          <Card.Text>
            Get the embed video link from youtube, Click on share -9 embed and
            copy the link and use as it is.
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    </>
  );
};

export default HTML;
