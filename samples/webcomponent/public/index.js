/* (C) 2024, HCL, Apache-2.0 License */

/* Cleanup the results */
const clearResults = () => {
  const main = document.querySelector('main');
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
};

/* Display a message */
const message = (msg) => {
  document.getElementById('message').innerText = msg;
};

const createRatingComponent = (event) => {
  event.preventDefault();
  const dialog = document.getElementById('newRatingDialog');
  dialog.showModal();
};

const saveNewRating = (event) => {
  event.preventDefault();
  const form = document.getElementById('dialogForRating');
  const data = form.elements;
  const score = data.ratingvalue.value;
  const size = data.starSize.value;
  const stars = data.stars.value;

  const main = document.querySelector('main');
  const rating = document.createElement('demo-rating');
  rating.setAttribute('score', score);
  rating.setAttribute('size', size);
  rating.setAttribute('stars', stars);
  rating.id = new Date().getTime();
  main.appendChild(rating);
  const dialog = document.getElementById('newRatingDialog');
  dialog.close();
};

const showCurrenRating = (event) => {
  event.preventDefault();
  const ratings = document.querySelectorAll('demo-rating');
  let r = [];
  ratings.forEach((rating) =>
    r.push(`${rating.getAttribute('score')}/${rating.getAttribute('stars')}`)
  );
  message(`Current scores are ${r.join(', ')}`);
};

const setCurrentRatingFull = (event) => {
  event.preventDefault();
  const ratings = document.querySelectorAll('demo-rating');
  ratings.forEach((rating) =>
    rating.setAttribute('score', rating.getAttribute('stars'))
  );
};

const setCurrentRatingSize = (event) => {
  event.preventDefault();
  const ratings = document.querySelectorAll('demo-rating');
  const size = ratings[0].getAttribute('size');
  const newSize = size == '24px' ? '36px' : '24px';
  ratings.forEach((rating) => rating.setAttribute('size', newSize));
};

const listenForRatingChange = (event) => {
  event.preventDefault();
};

/* Function to setup the page */
const setupPage = () => {
  // Wire up the buttons
  document
    .getElementById('btnCreate')
    .addEventListener('click', createRatingComponent);

  document
    .getElementById('btnShow')
    .addEventListener('click', showCurrenRating);

  document
    .getElementById('btnFull')
    .addEventListener('click', setCurrentRatingFull);

  document
    .getElementById('btnSet')
    .addEventListener('click', setCurrentRatingSize);

  document
    .getElementById('btnListen')
    .addEventListener('click', listenForRatingChange);

  document.getElementById('btnSave').addEventListener('click', saveNewRating);

  document.getElementById('btnClearAll').addEventListener('click', (event) => {
    event.preventDefault();
    clearResults();
  });

  console.log('Page loaded, ready to go');
};

/* Hook the JS into the loading event */
if (document.readyState != 'loading') {
  setupPage();
} else {
  document.addEventListener('DOMContentLoaded', setupPage);
}
