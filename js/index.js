'use strict';

class General {
  constructor(startBtn) {
    this.startButton = document.querySelector(startBtn);
    this.cardAreas = document.querySelectorAll('.block');
  }

  setGameGonfig() {
    this.startButton.addEventListener('click', e => {
      e.preventDefault();
      this.startButton.classList.add('hidden');
      document
        .querySelector('#modal')
        .classList.replace('popup-active', 'popup');
      document
        .querySelector('#map')
        .classList.replace('map-preload', 'map-load');
      this.cardAreas.forEach(block => {
        block.classList.replace('block-preload', 'block-load');
      });
      const render = new Render(this.cardAreas);
      render.renderCards();
      new Game().startGame();
    });
  }
}

class Render {
  constructor(areas) {
    this.areas = areas;
    this.pawsQ = 10;
    this.printsQ = 3;
  }

  getPawPrints() {
    let template = ``;
    for (let i = 0; i < this.pawsQ; i++) {
      template += `
      <i class="fa fa-paw paw"></i>
      `;
    }
    return template;
  }
  getCards() {
    let template = `<div class="card">
    <div class="face front"></div>
    <div class="face back">
    <img src="img/cat1.png" alt="cat1" class="card-img">
    </div>
    </div>`;
    return template;
  }
  renderBlock() {
    let template = ``;
    for (let i = 0; i < this.printsQ; i++) {
      template +=
        `
      <div class="wrap">
      <div class="paws">` +
        this.getPawPrints() +
        `</div>
      ` +
        this.getCards() +
        `</div>`;
    }
    return template;
  }
  renderCards() {
    this.areas.forEach(block => {
      block.innerHTML = this.renderBlock();
    });
  }
}

class Game {
  constructor() {
    this.showCard = document.querySelectorAll('.paws');
    this.cards = document.querySelectorAll('.card');
    this.cardState = false;
  }

  startGame() {
    this.cards.forEach(e => {
      e.addEventListener('click', e => {
        e.preventDefault();
        const cardElement = e.target.closest('.front');
       // cardElement.style.transform = 'perspective(120px) rotateY(180deg)';
      //  cardElement.nextElementSibling.style.transform = 'perspective(120px) rotateY(360deg)';
        cardElement.classList.add('flip-front');
        cardElement.nextElementSibling.classList.add('flip-back');
      });
    });
  }
}

new General('#start-game-btn', '.block').setGameGonfig();
