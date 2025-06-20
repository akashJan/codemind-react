import React from "react";

const JavaScript = () => {
  const headingStyle = {
    background: "linear-gradient(to right, #3b82f6, #60a5fa)", // blue gradient
    color: "white",
    textAlign: "center",
    padding: "20px",
    margin: "20px auto",
    width: "fit-content",
    borderRadius: "8px",
    fontSize: "24px",
  };
  return (
    <div>
      <h2 style={headingStyle}>Welcome to JavaScript</h2>;
    </div>
  );
};

export default JavaScript;
