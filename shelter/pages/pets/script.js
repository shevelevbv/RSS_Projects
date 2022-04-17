const burgerIcon = document.querySelector('.burger');
const header = document.querySelector('.header');

header.addEventListener('click', toggleOpenClass);

function toggleOpenClass () {
  if (event.target.classList.contains('burger') ||
  event.target.classList.contains('burger__line') || 
  event.target.classList.contains('nav__link')) {
    header.classList.toggle('open');
  }
}