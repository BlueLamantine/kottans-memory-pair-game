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

  getPawPrints() {
    const dots = Render.getCoordinates(this.firstDot, this.pawsQ);
    let template = ``;
    for (let i = 0; i < this.pawsQ; i++) {
      template += `
      <i class="fa fa-paw paw" style="top: ${dots[i].top}px; left: ${dots[i].left}px;"></i>
      `;
    }
    return template;
  }
  getCards() {

    let template = `<div class="card">
    <div class="face front">front</div>
    <div class="face back">back</div>
    </div>`;
    return template;
  }
  renderBlock() {
    let template = ``;
    for (let i = 0; i < this.printsQ; i++) {
      template += `
      <div class="wrap">
      <div class="paws">` + this.getPawPrints() + `</div>
      ` + this.getCards() + `</div>`

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
  //  this.showCard = document.querySelectorAll('.paws');
    
    this.cardState = false;
  }


  startGame() {

    /*[].forEach.call(this.showCard, el => {
      el.addEventListener('mouseover', e => {
        console.log(e.target);
      });
  });*/
 // this.showCard.forEach(e => {

   // e.addEventListener('mouseover', e => {
    //  e.preventDefault();
      
      //const cardElement = e.target.closest('.wrap').lastChild;
      //
   //   const cardElement = e.target.closest('.wrap').querySelector('.card');
   //   cardElement.classList.remove('hidden');
    //  this.animation(e.target.closest('.wrap').querySelector('.card'));
      
   // });

   // e.addEventListener('click', e => {
    //  e.preventDefault();
    //  console.log('clicked');
   //   this.cardState = true;
  //  });

    /*e.addEventListener('mouseout', e => {
      e.preventDefault();
      //console.log(this.cardState);


      const cardElement = e.target.closest('.wrap').querySelector('.card');
      cardElement.classList.add('hidden');
      

      // e.target.closest('.wrap').lastChild;
      //cardElement.classList.add('hidden');
      //console.log(cardElement);
      
    });
    
*/
 // });

  }
}

new General('#start-game-btn', '.block').setGameGonfig();
