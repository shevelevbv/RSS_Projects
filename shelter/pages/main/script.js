import allPetsInfo from '../pets.json' assert {type: 'json'};

const HEADER = document.querySelector('.header');
const BODY = document.querySelector('body');
const PET_SHOW = document.querySelector('.our-friends__show');
const CARDS = document.querySelector('.our-friends__cards');
const BTN_LEFT = document.querySelector('.our-friends__back');
const BTN_RIGHT = document.querySelector('.our-friends__forward');
let cardSectionLeft = document.querySelector('.our-friends__cards-left');
let cardSectionActive = document.querySelector('.our-friends__cards-active');
let cardSectionRight = document.querySelector('.our-friends__cards-right');
let currentPets = ['Katrine', 'Jennifer', 'Woody'];
let petNames = [];

HEADER.addEventListener('click', toggleOpenClass);
PET_SHOW.addEventListener('click', moveCards);
CARDS.addEventListener('animationend', () => {
  CARDS.classList.remove('move-left');
  CARDS.classList.remove('move-right');
  PET_SHOW.addEventListener('click', moveCards);
})

allPetsInfo.forEach(object => {
  petNames.push(object.name);
});

let petNamesLeft = getNewNames([]);
let petNamesRight = getNewNames([]);

populateCards (cardSectionLeft, petNamesLeft);
populateCards (cardSectionRight, petNamesRight);

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

function createCard (name, imagePath) {
  const card = document.createElement('li');
  card.classList.add('our-friends__card');
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('our-friends__picture');
  const image = document.createElement('img');
  image.setAttribute('src', imagePath);
  image.setAttribute('alt', 'Pet picture');
  const petName = document.createElement('h4');
  petName.classList.add('our-friends__name');
  petName.innerText = name;
  const button = document.createElement('button');
  button.innerText = 'Learn more';
  button.classList.add('button');
  button.classList.add('our-friends__button');
  
  imageContainer.appendChild(image);
  card.appendChild(imageContainer);
  card.appendChild(petName);
  card.appendChild(button);

  return card;
}

function getNewNames (nameArray) {
  nameArray = [];
  while (nameArray.length < 3) {
    let name = petNames[Math.floor(Math.random() * 8)];
    if (!currentPets.includes(name) && !nameArray.includes(name)) {
      nameArray.push(name);
    }
  }
  return nameArray;
}

function populateCards (cardSection, namesArray) {
  cardSection.innerHTML = '';
  namesArray.forEach(name => {
    allPetsInfo.forEach (object => {
      if (name === object.name) {
        cardSection.appendChild(createCard(name, object.img));
      }
    })
  })
};
