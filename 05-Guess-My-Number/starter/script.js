'use strict';
<<<<<<< Updated upstream
=======

let secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;
let highscore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const value = Number(document.querySelector('.guess').value);

  if (!value) {
    document.querySelector(
      '.message'
    ).textContent = `❌ No number. Insert a number.`;
  } else if (value === secretNumber) {
    document.querySelector('.message').textContent = `✅ You win!`;
    document.querySelector('.highscore').textContent = score;

    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#0EC50E';
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (value !== secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent =
        value > secretNumber ? `❎ Too High!` : `❎ Too low!`;
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = `❌ You lost!!!`;
      document.querySelector('.score').textContent = 0;
    }
  }
});
/*
  else if (value < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = `❎ Too low!`;
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = `❌ You lost!!!`;
      document.querySelector('.score').textContent = 0;
    }
  } else if (value > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = `❎ Too High!`;
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = `❌ You lost!!!`;
      document.querySelector('.score').textContent = 0;
    }
  } else {
   */

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  //document.querySelector('.highscore').textContent = 0;
  document.querySelector('.score').textContent = score;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
});
>>>>>>> Stashed changes
