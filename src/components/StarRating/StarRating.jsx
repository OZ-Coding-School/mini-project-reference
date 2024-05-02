import React from "react";

const StarRating = ({ rating }) => {
  // Convert the rating from a 0-10 scale to a 0-5 scale
  const starRating = rating / 2;
  const fullStars = Math.floor(starRating);
  const halfStar = starRating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  // Make sure none of the counts are negative
  const fullStarCount = Math.max(fullStars, 0);
  const halfStarCount = Math.max(halfStar, 0);
  const emptyStarCount = Math.max(emptyStars, 0);

  console.log({ starRating, fullStars, halfStar, emptyStars });

  return (
    <div className="star-rating">
      {Array.from({ length: fullStarCount }, (_, index) => (
        <span key={`full-${index}`} className="star full">
          ★
        </span>
      ))}
      {halfStarCount > 0 && (
        <span key="half" className="star half">
          ★
        </span>
      )}
      {Array.from({ length: emptyStarCount }, (_, index) => (
        <span key={`empty-${index}`} className="star empty">
          ☆
        </span>
      ))}
    </div>
  );
};

export default StarRating;
