import React from "react";

const StarRating = ({ rating }) => {
  // Helper function to determine stars
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        // Full star
        stars.push(
          <span key={i} style={{ color: "blue", fontSize: "1rem" }}>
            ★
          </span>
        );
      } else if (rating >= i - 0.5) {
        // Half star
        stars.push(
          <span key={i} style={{ color: "blue", fontSize: "1rem" }}>
            ☆
          </span>
        );
      } else {
        // Empty star
        stars.push(
          <span key={i} style={{ color: "lightgray", fontSize: "1rem" }}>
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return <div>{renderStars()}</div>;
};

export default StarRating;
