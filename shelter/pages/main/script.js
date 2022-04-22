const HEADER = document.querySelector('.header');
const BODY = document.querySelector('body');
const PET_SHOW = document.querySelector('.our-friends__show');
const CARDS = document.querySelector('.our-friends__cards');
const BTN_LEFT = document.querySelector('.our-friends__back');
const BTN_RIGHT = document.querySelector('.our-friends__forward');

HEADER.addEventListener('click', toggleOpenClass);
PET_SHOW.addEventListener('click', moveCards);
CARDS.addEventListener('animationend', () => {
  CARDS.classList.remove('move-left');
  CARDS.classList.remove('move-right');
  PET_SHOW.addEventListener('click', moveCards);
})

function moveCards (event) {
  if (event.target.classList.contains('our-friends__back')) {
    CARDS.classList.add('move-left');
  } else if (event.target.classList.contains('our-friends__forward')) {
    CARDS.classList.add('move-right');
  }
  PET_SHOW.removeEventListener('click', moveCards);
}

function toggleOpenClass (event) {
  if (event.target.classList.contains('burger') ||
  event.target.classList.contains('burger__line') || 
  event.target.classList.contains('nav__link') ||
  event.target.classList.contains('page-mask')) {
    BODY.classList.toggle('open');
  }
}
