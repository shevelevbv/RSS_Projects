const burgerIcon = document.querySelector('.burger');
const header = document.querySelector('.header');
const body = document.querySelector('body');
const pageMask = document.querySelector('.page-mask');

header.addEventListener('click', toggleOpenClass);

function toggleOpenClass (event) {
  if (event.target.classList.contains('burger') ||
  event.target.classList.contains('burger__line') || 
  event.target.classList.contains('nav__link') ||
  event.target.classList.contains('page-mask')) {
    body.classList.toggle('open');
  }
}
