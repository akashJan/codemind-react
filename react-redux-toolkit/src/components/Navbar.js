import React from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const cart = useSelector((state) => state.counter);
  return (
    <div style={{ display: "flex", justify: "middle", margin: "10px" }}>
      <div>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact us</li>
          <li>Login</li>
          <li>cart: {cart}</li>
        </ul>
      </div>
    </div>
  );
}
