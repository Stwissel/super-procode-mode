/*
 * (C) 2024, HCL, Apache-2.0 License
 */

import React from 'react';
import './App.css';
import DemoRating from './components/DemoRating';
import DemoMessage from './components/DemoMessage';

function App() {
  const ratingArray = [React.createRef()];

  const [msg, setMsg] = React.useState('Press a button');

  /*
   * Clear out all content of the main tag
   */
  const clearResults = () => {
    const main = document.querySelector('main');
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
    message('Ratings cleared');
  };

  /*
   * Display a message on top of the page
   */
  const message = (msg) => {
    setMsg(msg);
  };

  /**
   * Add a new message to the list
   * @param {string} msg
   */
  const changeMessage = (msg) => {
    const change = document.getElementById('changes');
    const li = document.createElement('li');
    li.innerText = msg;
    change.appendChild(li);
  };

  /*
   * Show the moddal dialog to create a new rating with given values
   */
  const showNewRatingDialogue = () => {
    const dialog = document.getElementById('newRating');
    dialog.active = true;
  };

  /**
   * Extract value from the form and create a new rating component
   */
  const createNewRating = (event) => {
    event.preventDefault();

    // Construct the new rating
    const main = document.querySelector('main');
    const rating = document.createElement('demo-rating');
    rating.stars = event.detail.stars;
    rating.score = event.detail.score;
    rating.size = event.detail.size;
    rating.id = new Date().getTime();
    rating.appendChild(document.createTextNode(event.detail.title));
    main.appendChild(rating);
  };

  /**
   * Grab all ratings and show them on top of the page
   */
  const showCurrenRating = () => {
    let r = [];
    ratingArray.forEach((ratingref) => {
      const rating = ratingref.current;
      r.push(`${rating.state.score}/${rating.state.stars}`);
    });
    message(`Current scores are ${r.join(', ')}`);
  };

  /**
   * Set all ratings to their maximum value
   */
  const setCurrentRatingFull = () => {
    const ratings = document.querySelectorAll('demo-rating');
    ratings.forEach((rating) => (rating.score = rating.stars));
  };

  /**
   * Sey all ratings to zero
   */
  const setCurrentRatingZero = () => {
    const ratings = document.querySelectorAll('demo-rating');
    ratings.forEach((rating) => (rating.score = 0));
  };

  /**
   * Make all ratings the same size and toggle between 24px and 36px
   */
  const setCurrentRatingSize = () => {
    const ratings = document.querySelectorAll('demo-rating');
    const size = ratings[0].getAttribute('size');
    const newSize = size == '24px' ? '36px' : '24px';
    ratings.forEach((rating) => rating.setAttribute('size', newSize));
  };

  const addStars = () => {
    const ratings = document.querySelectorAll('demo-rating');
    ratings.forEach((rating) => {
      const actual = rating.stars + 1;
      rating.stars = actual;
    });
  };

  /**
   * Hook listeners to all ratings to listen for changes
   * and display them on top of the page
   */
  const listenForRatingChange = () => {
    const ratings = document.querySelectorAll('demo-rating');
    ratings.forEach((rating) => {
      rating.addEventListener('change', (event) => {
        changeMessage(
          `Rating ${rating.id} changed to ${event.detail.score}/${event.detail.max}`
        );
      });
    });
  };

  /**
   * The actual UI
   */
  return (
    <div className="App">
      <header>
        <DemoMessage id="message" msg={msg}></DemoMessage>
        <h1>React Demo Rating</h1>
        <div className="button-row">
          <button id="btnCreate" onClick={showNewRatingDialogue}>
            Create additional rating
          </button>
          <button id="btnShow" onClick={showCurrenRating}>
            Show ratings values
          </button>
          <button id="btnFull" onClick={setCurrentRatingFull}>
            Set all ratings to max
          </button>
          <button id="btnZero" onClick={setCurrentRatingZero}>
            Set all ratings to 0
          </button>
          <button id="btnSet" onClick={setCurrentRatingSize}>
            Set ratings size
          </button>
          <button id="btnAddStar" onClick={addStars}>
            Extend ratings by one star
          </button>
          <button id="btnListen" onClick={listenForRatingChange}>
            Listen to ratings changes
          </button>
          <button id="btnClearAll" onClick={clearResults}>
            Clear all ratings
          </button>
        </div>
        <ul id="changes"></ul>
      </header>
      <main>
        <DemoRating
          ref={ratingArray[0]}
          id="rating1"
          stars={5}
          score={3}
          size={'24px'}
        >
          Food
        </DemoRating>
      </main>
      <footer>
        <p>WebComponent Demo &copy; 2024 HCL, Apache-2.0 licensed</p>
      </footer>
    </div>
  );
}

export default App;
