// Box.js
import React from "react";

const Box = ({ children, style }) => {
  return (
    <div
      style={{
        // Add any default styles you want here
        position: "absolute",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "60px",
        ...style,
      }}
    >
      {children} {/* Render children passed to the Box */}
    </div>
  );
};

export default Box;
