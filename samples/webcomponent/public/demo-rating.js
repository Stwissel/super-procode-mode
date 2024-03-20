class DemoRating extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.starArray = [];
    this.connected = false;
    this.stars = 5;
  }

  /**
   * called when the element is inserted into the DOM
   */
  connectedCallback() {
    console.log('connected');
    this.render();
    this.addEventListeners();
    this.connected = true;
  }

  /**
   * Render the component to be visible in the DOM
   * logic to re-render on changes not included
   */
  render() {
    this.updateParameters();
    console.log(
      `Render ${this.stars} stars with score ${this.score} and size ${this.size}`
    );
    const starContainer = document.createElement('div');
    starContainer.classList.add('star-container');

    for (let i = 0; i < this.stars; i++) {
      const star = document.createElement('span');
      star.textContent = '★';
      star.classList.add('star');
      if (i < this.score) {
        star.classList.add('brightstar');
      }

      star.addEventListener('click', () => this.setScore(i + 1));
      this.starArray.push(star);
      starContainer.appendChild(star);
    }

    this.shadowRoot.innerHTML = `
            <style>
                .star-container {
                    display: inline-block;
                }
                .star {
                    color: gray;
                    cursor: pointer;
                    padding: 5px;
                    font-size: ${this.size};
                }
                .brightstar {
                    color: gold;
                }
            </style>
        `;
    this.shadowRoot.appendChild(starContainer);
  }

  /**
   * Checks all parameters within their boundaries
   */
  updateParameters() {
    this.stars = Math.max(
      Math.min(99, parseInt(this.getAttribute('stars')) || 5),
      0
    );
    const scoreCandidate = parseInt(this.getAttribute('score')) || 0;
    const actualScore = Math.min(scoreCandidate, this.stars);
    if (actualScore !== scoreCandidate) {
      this.setAttribute('score', actualScore);
    }
    this.score = actualScore;
    this.size = this.getAttribute('size') || '12px';
  }

  addEventListeners() {
    this.addEventListener('change', () => {
      // Handle change event
    });
  }

  /**
   * Fires when an attribute listed in observedAttributes
   * was added, removed, or updated
   *
   * @param {string} name
   * @param {*} oldValue
   * @param {*} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${name} changed from ${oldValue} to ${newValue}`);
    if (oldValue !== newValue && this.connected) {
      this[name] = newValue;
      this.render();
    }
  }

  /**
   * List attributes to observe and trigger attributeChangedCallback
   */
  static get observedAttributes() {
    return ['score', 'size', 'stars'];
  }

  /**
   * Setter called when clicking on a star
   * @param {int} score
   */
  setScore(score) {
    this.score = score;
    this.setAttribute('score', score);
    this.dispatchEvent(new Event('change'));
  }
}

/**
 * Make the class available as a custom element
 */
customElements.define('demo-rating', DemoRating);