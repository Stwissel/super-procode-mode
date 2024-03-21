import React, { useState } from 'react';

const DemoRating = ({ stars, score, size }) => {
  const [currentScore, setCurrentScore] = useState(score);

  const handleStarClick = (star) => {
    setCurrentScore(star);
    // Emit event with star and currentScore;
  };

  const renderStars = () => {
    console.log('renderStars', currentScore);
    const starElements = [];
    for (let i = 1; i <= stars; i++) {
      const isHighlighted = i <= currentScore;
      starElements.push(
        <span
          key={i}
          onClick={() => handleStarClick(i)}
          style={{ fontSize: size, color: isHighlighted ? 'gold' : 'gray' }}
        >
          ★
        </span>
      );
    }
    return starElements;
  };

  return (
    <div>
      <div>{renderStars()}</div>
    </div>
  );
};

export default DemoRating;
