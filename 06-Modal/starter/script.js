'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
console.log(btnsOpenModal);


//Function to open the modal
const openModal = function(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
//EventHandeler to each button
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
    
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
//function to close the modal when I click on the "X" button
btnCloseModal.addEventListener('click', closeModal);

//function to close the model when I click on the overlay (without clicking the "X" button)
overlay.addEventListener('click', closeModal);
