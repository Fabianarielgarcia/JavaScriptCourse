'use strict';

///Selecting elelements
const score0Element = document.querySelector('#score--0'); //DOM element
const score1Element = document.getElementById('score--1'); ///another way to get an element by its id
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const scorePlayer0 = document.querySelector('#current--0');
const scorePlayer1 = document.querySelector('#current--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

let scores, activePlayer, playing, currentScore;

const init = function () {
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;

  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];

  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active'); ///player 0 active player
  player1Element.classList.remove('player--active'); ///playr 0 active player
};

init();

///Switching player function
const changePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};
///Rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    let randomDice = Math.trunc(Math.random() * 6) + 1;

    diceElement.classList.remove('hidden');

    diceElement.src = `dice-${randomDice}.png`;

    if (randomDice !== 1) {
      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      changePlayer();
    }
  }
});

///Holding function
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 10) {
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      changePlayer();
    }
  }
});

///New game function
btnNew.addEventListener('click', init);
