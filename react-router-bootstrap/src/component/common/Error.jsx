import React from "react";
import errorImage from "../../assets/img.jpg"; // adjust the path accordingly

const Error = () => {
  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f8f8f8",
      color: "#333",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    image: {
      height: "500px",
      width: "500px",
      objectFit: "contain",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.heading}>Error Page — Please enter a valid path</div>
      <img src={errorImage} alt="not found" style={styles.image} />
    </div>
  );
};

export default Error;
