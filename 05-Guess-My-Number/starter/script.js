'use strict';

document.querySelector('.check').addEventListener('click', function () {
  const value = Number(document.querySelector('.guess').value);

  if (!value) {
    document.querySelector(
      '.message'
    ).textContent = `❌ No number. Insert a number.`;
  }else if()
});
