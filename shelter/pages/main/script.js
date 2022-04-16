const burgerIcon = document.querySelector('.burger');
const header = document.querySelector('.header');

burgerIcon.addEventListener('click', toggleOpenClass);

function toggleOpenClass () {
  if (event.target.classList.contains('burger')) {
    header.classList.toggle('open');
  }
}