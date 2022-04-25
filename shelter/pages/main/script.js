fetch('../pets.json')
  .then((response) => response.json())
  .then((allPetsInfo) => {
    const PET_SHOW = document.querySelector('.our-friends__show');
    const CARDS = document.querySelector('.our-friends__cards');
    let cardSectionLeft = document.querySelector('.our-friends__cards-left');
    let cardSectionActive = document.querySelector(
      '.our-friends__cards-active'
    );
    let cardSectionRight = document.querySelector('.our-friends__cards-right');
    let currentPets = ['Katrine', 'Jennifer', 'Woody'];
    let petNames = [];

    allPetsInfo.forEach((object) => {
      petNames.push(object.name);
    });

    let petNamesLeft = getNewNames([]);
    let petNamesRight = getNewNames([]);

    populateCards(cardSectionLeft, petNamesLeft);
    populateCards(cardSectionRight, petNamesRight);

    PET_SHOW.addEventListener('click', moveCards);

    for (let child of cardSectionActive.children) {
      child.addEventListener('click', () => {
        let petNameElement = child.querySelector('.our-friends__name');
        createPopupWindow(petNameElement.innerHTML);
      })
    }

    CARDS.addEventListener('animationend', () => {
      if (CARDS.classList.contains('move-left')) {
        CARDS.classList.remove('move-left');
        currentPets = petNamesLeft;
        cardSectionActive.innerHTML = cardSectionLeft.innerHTML;
      } else if (CARDS.classList.contains('move-right')) {
        CARDS.classList.remove('move-right');
        currentPets = petNamesRight;
        cardSectionActive.innerHTML = cardSectionRight.innerHTML;
      }

      petNamesLeft = getNewNames([]);
      petNamesRight = getNewNames([]);

      populateCards(cardSectionLeft, petNamesLeft);
      populateCards(cardSectionRight, petNamesRight);

      PET_SHOW.addEventListener('click', moveCards);
      PET_SHOW.addEventListener('click', togglePopupClass);

      for (let child of cardSectionActive.children) {
        child.addEventListener('click', () => {
          let petNameElement = child.querySelector('.our-friends__name');
          createPopupWindow(petNameElement.innerHTML);
        })
      }
    });

    function moveCards(event) {
      if (event.target.classList.contains('our-friends__back')) {
        CARDS.classList.add('move-left');
        PET_SHOW.removeEventListener('click', moveCards);
        PET_SHOW.removeEventListener('click', togglePopupClass);
      } else if (event.target.classList.contains('our-friends__forward')) {
        CARDS.classList.add('move-right');
        PET_SHOW.removeEventListener('click', moveCards);
        PET_SHOW.removeEventListener('click', togglePopupClass);
      }
    }

    function createCard(name, imagePath) {
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

    function populateCards(cardSection, namesArray) {
      cardSection.innerHTML = '';
      namesArray.forEach((name) => {
        allPetsInfo.forEach((object) => {
          if (name === object.name) {
            cardSection.appendChild(createCard(name, object.img));
          }
        });
      });
    }
  });

  const HEADER = document.querySelector('.header');
  const BODY = document.body;
  const PET_SHOW = document.querySelector('.our-friends__show');
  const POPUP_MASK = document.querySelector('.popup-mask');
  const POPUP_BTN = document.querySelector('.popup__button');
  
  HEADER.addEventListener('click', toggleOpenClass);
  PET_SHOW.addEventListener('click', togglePopupClass);
  POPUP_MASK.addEventListener('mouseover', addHoverClass);
  POPUP_MASK.addEventListener('mouseover', removeHoverClass);
  
  function addHoverClass(event) {
    if (event.target.classList.contains('popup-mask') ||
    event.target.classList.contains('popup__container')) {
      POPUP_BTN.classList.add('hover');
    }
  }

  function removeHoverClass(event) {
    if (event.target.closest('.popup__window')) {
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
