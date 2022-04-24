fetch('../pets.json')
  .then((response) => response.json())
  .then((allPetsInfo) => {
    const OUR_FRIENDS_SECTION = document.querySelector('.our-friends');
    const CARDS = document.querySelectorAll('.our-friends__card');
    let currentPets = ['Katrine', 'Jennifer', 'Woody'];
    let petNames = [];

    allPetsInfo.forEach((object) => {
      petNames.push(object.name);
    });

    let petNamesLeft = getNewNames([]);
    let petNamesRight = getNewNames([]);

    for (let card of CARDS) {
      card.addEventListener('click', () => {
        let petNameElement = card.querySelector('.our-friends__name');
          createPopupWindow(petNameElement.innerHTML);
      })
    }

    function createPopupWindow(name) {
      let popupImage = document.querySelector('.popup__image > img');
      let popupTitle = document.querySelector('.popup__title');
      let popupBreed = document.querySelector('.popup__breed');
      let popupText = document.querySelector('.popup__text');
      let popupAge = document.querySelector('.popup__age .popup__note-spec');
      let popupInoculations = document.querySelector('.popup__inoculations .popup__note-spec');
      let popupDiseases = document.querySelector('.popup__diseases .popup__note-spec');
      let popupParasites = document.querySelector('.popup__parasites .popup__note-spec');
      
      for (let object of allPetsInfo) {
        if (name === object.name) {
          popupImage.src = object.img;
          popupTitle.innerHTML = object.name;
          popupBreed.innerHTML = `${object.type} - ${object.breed}`;
          popupText.innerHTML = object.description;
          popupAge.innerHTML = object.age;
          popupInoculations.innerHTML = object.inoculations.join(', ');
          popupDiseases.innerHTML = object.diseases.join(', ');
          popupParasites.innerHTML = object.parasites.join(', ');
        }
      }
    }

    function getNewNames(nameArray) {
      nameArray = [];
      while (nameArray.length < 3) {
        let name = petNames[Math.floor(Math.random() * 8)];
        if (!currentPets.includes(name) && !nameArray.includes(name)) {
          nameArray.push(name);
        }
      }
      return nameArray;
    }
  });

  const HEADER = document.querySelector('.header');
  const BODY = document.body;
  const OUR_FRIENDS_SECTION = document.querySelector('.our-friends');
  const POPUP_MASK = document.querySelector('.popup-mask');
  const POPUP_BTN = document.querySelector('.popup__button');
  
  HEADER.addEventListener('click', toggleOpenClass);
  OUR_FRIENDS_SECTION.addEventListener('click', togglePopupClass);
  POPUP_MASK.addEventListener('mouseover', addHoverClass);
  POPUP_MASK.addEventListener('mouseover', removeHoverClass);
  
  function addHoverClass(event) {
    if (event.target.classList.contains('popup-mask') ||
    event.target.classList.contains('popup__container')) {
      POPUP_BTN.classList.add('hover');
    }
  }

  function removeHoverClass(event) {
    if (event.target.classList.contains('popup__window')) {
      POPUP_BTN.classList.remove('hover');
    }
  }

  function toggleOpenClass(event) {
    if (
      event.target.classList.contains('burger') ||
      event.target.classList.contains('burger__line') ||
      event.target.classList.contains('nav__link') ||
      event.target.classList.contains('page-mask')
    ) {
      if (!BODY.classList.contains('open')) {
        disablePage('open');
      } else {
        enablePage('open');
      }
    }
  }

  function togglePopupClass(event) {
    if (
      event.target.closest('.our-friends__card') ||
      event.target.classList.contains('popup-mask') ||
      event.target.classList.contains('popup__container') ||
      event.target.closest('.popup__button')
    ) {
      if (!BODY.classList.contains('pop-up')) {
        disablePage('pop-up');
      } else {
        enablePage('pop-up');
      }
    }
  }
  
  function disablePage(className) {
    let pagePosition = window.scrollY;
    BODY.classList.add(className);
    BODY.dataset.position = pagePosition;
    BODY.style.top = -pagePosition + 'px';
  }
  
  function enablePage(className) {
    let pagePosition = parseInt(BODY.dataset.position, 10);
    BODY.style.top = 'auto';
    BODY.classList.remove(className);
    window.scroll({top: pagePosition, left: 0});
    BODY.removeAttribute('data-position');
  }
