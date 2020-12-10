'use strict';

class General {
  constructor(startBtn) {
    this.element = document.querySelector(startBtn);
  }

  startGame() {
    this.element.addEventListener('click', e => {
      e.preventDefault();
      this.element.classList.add('hidden');
      document
        .querySelector('#modal')
        .classList.replace('popup-active', 'popup');
      document
        .querySelector('#map')
        .classList.replace('map-preload', 'map-load');
      document.querySelectorAll('.block').forEach(block => {
        block.classList.replace('block-preload', 'block-load');
      });
    });
  }
}

new General('#start-game-btn').startGame();
