import React from "react";
import "./na.css";
import { Outlet, Link } from "react-router-dom";
const navbar = () => {
  return (
    <>
      <header class="header">
        <a href="/" class="logo">
          Portfolio
        </a>
        <i class="fa-solid fa-bars" id="menu-icon"></i>
        <nav class="navbar">
          <Link to="/" class="active">
            Home
          </Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <Outlet />
      </header>
    </>
  );
};

export default navbar;
