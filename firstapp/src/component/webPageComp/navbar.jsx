import React from "react";
import "./na.css";
const navbar = () => {
  return (
    <>
      <header class="header">
        <a href="#" class="logo">
          Portfolio
        </a>
        <i class="fa-solid fa-bars" id="menu-icon"></i>
        <nav class="navbar">
          <a href="#home" class="active">
            Home
          </a>
          <a href="#about" class="">
            About
          </a>
          <a href="#services" class="">
            Services
          </a>
          <a href="#portfolio" class="">
            Portfolio
          </a>
          <a href="#contact" class="">
            Contact
          </a>
        </nav>
      </header>
    </>
  );
};

export default navbar;
