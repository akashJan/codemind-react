import React from "react";
import Carousel from "react-bootstrap/Carousel";
import cssImg from "../../assets/css.png";
import cssProp from "../../assets/css-prop.jpg";
import cssBox from "../../assets/css-box.jpg";

function CSS() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Carousel>
        <Carousel.Item style={{ width: "auto", height: "auto" }}>
          <img
            style={{ width: "800px", height: "500px" }}
            src={cssImg}
            alt="not found"
          ></img>
          <Carousel.Caption>
            <h3>Welcome to CSS</h3>
            <p>CSS is design oriented language</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: "800px", height: "500px" }}
            src={cssProp}
            alt="not found"
          ></img>
          <Carousel.Caption>
            <h3 style={{ color: "black" }}>CSS Properties</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: "800px", height: "500px" }}
            src={cssBox}
            alt="not found"
          ></img>
          <Carousel.Caption>
            <h3 style={{ color: "black" }}>CSS Borders</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CSS;
