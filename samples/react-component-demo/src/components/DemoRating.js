/**
 * (C) 2024, HCL, Apache-2.0 License
 * A simple web component to display rating stars
 */
import React from 'react';

export default class DemoRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      stars: props.stars,
      score: props.score,
      size: props.size
    };
  }

  handleStarClick = (star) => {
    this.setState({ ...this.state, score: star });
    // Emit event with star and currentScore;
  };

  renderStars = () => {
    console.log('renderStars', this.state.score);
    const starElements = [];
    for (let i = 1; i <= this.state.stars; i++) {
      const isHighlighted = i <= this.state.score;
      starElements.push(
        <span
          key={i}
          onClick={() => this.handleStarClick(i)}
          style={{
            fontSize: this.state.size,
            color: isHighlighted ? 'gold' : 'gray'
          }}
        >
          ★
        </span>
      );
    }
    return starElements;
  };

  render() {
    return <div>{this.renderStars()}</div>;
  }
}
