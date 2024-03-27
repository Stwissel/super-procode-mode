/*
 * (C) 2024, HCL, Apache-2.0 License
 */

import React, { useState } from 'react';
import './App.css';
import DemoRating from './components/DemoRating';
import DemoMessage from './components/DemoMessage';

function App() {
  const initialRating = {
    id: 'rating1',
    stars: 5,
    score: 3,
    siz: '24px',
    title: 'Food',
    ref: React.createRef()
  };

  const [ratingArray, setRatingArray] = useState([initialRating]);

  document
    .getElementById('btnSaveNewRating')
    .addEventListener('click', (event) => {
      event.preventDefault();
      const form = document.getElementById('dialogForRating');
      const data = form.elements;
      const newborn = {
        id: new Date().getTime(),
        stars: data.stars.value,
        score: data.ratingvalue.value,
        size: data.starSize.value,
        title: data.title.value || 'undefined',
        ref: React.createRef()
      };
      let newRatingArray = [...ratingArray];
      newRatingArray.push(newborn);
      const dialog = document.getElementById('newRatingDialog');
      dialog.close();
      setRatingArray(newRatingArray);
    });

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
    const dialog = document.getElementById('newRatingDialog');
    dialog.show();
  };

  /**
   * Grab all ratings and show them on top of the page
   */
  const showCurrenRating = () => {
    let r = [];
    ratingArray.forEach((ratingref) => {
      const rating = ratingref.ref.current;
      r.push(`${rating.state.score}/${rating.state.stars}`);
    });
    message(`Current scores are ${r.join(', ')}`);
  };

  /**
   * Set all ratings to their maximum value
   */
  const setCurrentRatingFull = () => {
    ratingArray.forEach((ratingref) => {
      const rating = ratingref.ref.current;
      rating.setState({ score: rating.state.stars });
    });
  };

  /**
   * Sey all ratings to zero
   */
  const setCurrentRatingZero = () => {
    ratingArray.forEach((ratingref) => {
      const rating = ratingref.ref.current;
      rating.setState({ score: 0 });
    });
  };

  /**
   * Make all ratings the same size and toggle between 24px and 36px
   */
  const setCurrentRatingSize = () => {
    const size = ratingArray[0].ref.current.state.size;
    const newSize = size === '24px' ? '36px' : '24px';
    ratingArray.forEach((ratingref) => {
      const rating = ratingref.ref.current;
      rating.setState({ size: newSize });
    });
  };

  const addStars = () => {
    ratingArray.forEach((ratingref) => {
      const rating = ratingref.ref.current;
      const actual = Number(rating.state.stars) + 1;
      rating.setState({ stars: actual });
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

  const renderRatings = () => {
    const ratingElements = [];
    ratingArray.forEach((ratingdef) => {
      ratingElements.push(
        <DemoRating
          ref={ratingdef.ref}
          id={ratingdef.id}
          key={ratingdef.id}
          stars={ratingdef.stars}
          score={ratingdef.score}
          size={ratingdef.size}
        >
          {ratingdef.title}
        </DemoRating>
      );
    });
    return ratingElements;
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
          <button
            id="btnListen"
            onClick={listenForRatingChange}
            className="unfixed"
          >
            Listen to ratings changes
          </button>
          <button id="btnClearAll" onClick={clearResults}>
            Clear all ratings
          </button>
        </div>
        <ul id="changes"></ul>
      </header>
      <main>{renderRatings()}</main>
      <footer>
        <p>WebComponent Demo &copy; 2024 HCL, Apache-2.0 licensed</p>
      </footer>
    </div>
  );
}

export default App;
