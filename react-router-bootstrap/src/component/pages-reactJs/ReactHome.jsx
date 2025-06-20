import React from "react";

const ReactHome = () => {
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
      <h2 style={headingStyle}>Welcome to React</h2>;
    </div>
  );
};

export default ReactHome;
