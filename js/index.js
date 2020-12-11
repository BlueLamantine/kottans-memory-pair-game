'use strict';

class General {

  constructor(startBtn) {
    this.startButton = document.querySelector(startBtn);
    this.cardAreas = document.querySelectorAll('.block');
  }

  startGame() {
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
      new Render(this.cardAreas).renderPaws();
    });
  }

}

class Render {

  constructor(areas) {
    this.areas = areas;
    this.firstDot = {
      x: 20,
      y: 65,
    };
    this.pawsQ = 10;
    this.printsQ = 3;
  }

  static getCoordinates(dot, quantity) {
    let setOfCoords = [];
    setOfCoords.push({
      top: dot.y,
      left: dot.x,
    });
    for (let i = 0; i < quantity - 1; i++) {
      let temp = {};
      if (i % 2 == 0) {
        temp.top = setOfCoords[i].top - 10;
        temp.left = setOfCoords[i].left;
      } else {
        temp.top = setOfCoords[i].top;
        temp.left = setOfCoords[i].left + 10;
      }
      setOfCoords.push(temp);
    }
    return setOfCoords;
  }

  getPaw() {
    const dots = Render.getCoordinates(this.firstDot, this.pawsQ);
    let template = ``;
    for (let i = 0; i < this.pawsQ; i++) {
      template += `
      <i class="fa fa-paw paw" style="top: ${dots[i].top}px; left: ${dots[i].left}px;"></i>
      `;
    }
    return template;
  }

  getPawPrints() {
    let template = ``;
    for (let i = 0; i < this.printsQ; i++) {
      template += `<div class="paws">` + this.getPaw() + `</div>`;
    }
    return template;
  }
  renderPaws() {
    this.areas.forEach(block => {
      block.innerHTML = this.getPawPrints();
    });
  }

}
new General('#start-game-btn', '.block').startGame();
