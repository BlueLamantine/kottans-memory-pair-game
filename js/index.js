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
      new Render(this.cardAreas).renderCards();
      new Game().startGame();
    });
  }
}

class Render {
  constructor(areas) {
    this.cardsArray = [
      {
        name: 'pawtter',
        path: 'img/cats/pawtter.png',
      },
      {
        name: 'hairmeowne',
        path: 'img/cats/hairmeowne.png',
      },
      {
        name: 'ron',
        path: 'img/cats/ron.png',
      },
      {
        name: 'lord',
        path: 'img/cats/lord.png',
      },
      {
        name: 'sevepuss',
        path: 'img/cats/sevepuss.png',
      },
      {
        name: 'dumpurrdore',
        path: 'img/cats/dumpurrdore.png',
      },
    ];
    this.areas = areas;
    this.pawsInBlock = 10;
    this.cardsInBlock = 3;
  }

  shuffleCards() {
    const shuffleArray = this.cardsArray.concat(this.cardsArray).sort(() => {
      return 0.5 - Math.random();
    });
    const cardsBack = document.querySelectorAll('.back');
    shuffleArray.forEach((data, cardIndex) => {
      cardsBack[cardIndex].innerHTML = `
      <img name="${data.name}" src="${data.path}" alt="cat" class="card-img">
      `;
    });
  }

  getPawPrints() {
    let template = ``;
    for (let i = 0; i < this.pawsInBlock; i++) {
      template += `<i class="fa fa-paw paw"></i>`;
    }
    return template;
  }

  renderBlock() {
    let template = ``;
    for (let i = 0; i < this.cardsInBlock; i++) {
      template += `
      <div class="wrap">
        <div class="paws">
          ${this.getPawPrints()}
        </div>
        <div class="card">
          <div class="face front"></div>
          <div class="face back"></div>
        </div>
      </div>`;
    }
    return template;
  }

  renderCards() {
    this.areas.forEach(block => {
      block.innerHTML = this.renderBlock();
    });
    this.shuffleCards();
  }
}

class Game {
  constructor() {
    this.showCard = document.querySelectorAll('.paws');
    this.cards = document.querySelectorAll('.card');
    this.isOpen = false;
  }

  fetFlip (card) {
    card.closest('.card').querySelector('.front').classList.toggle('open');
    card.closest('.card').querySelector('.back').classList.toggle('open');
  }

  startGame() {
    this.cards.forEach(e => {
      e.addEventListener('click', e => {
        e.preventDefault();
        const currentCard = e.target;
        getFlip(currentCard);

      });
    });
  }
}
/*
 currentCard.classList.add('open');
        currentCard.nextElementSibling.classList.add('open');

        let openedCards = Array.from(document.querySelectorAll('.front.open'));
        console.log('otkrutue', openedCards);

        if (openedCards.length === 2) {
          let openedCardsNames = openedCards.map(card =>
            card.nextElementSibling.firstElementChild.getAttribute('name')
          );
          console.log(
            openedCardsNames,
            openedCardsNames.every((name, i, arr) => name === arr[0])
          );

          if (
            (openedCardsNames,
            openedCardsNames.every((name, i, arr) => name === arr[0]))
          ) {
            console.log('odinakovue!');
          } else {
            console.log('net, zakrut!', openedCards);

              openedCards.map(card => {
                card.classList.remove('open');
                card.nextElementSibling.remove('open');
              });
 
            openedCards = [];
            console.log('zakruto', openedCards);
          }
        }
*/
new General('#start-game-btn', '.block').setGameGonfig();
