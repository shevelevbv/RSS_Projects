fetch('../pets.json')
  .then((response) => response.json())
  .then((allPetsInfo) => {

    const CARDS = document.querySelectorAll('.our-friends__card');
    const OUR_FRIENDS_BTNS = document.querySelectorAll('.our-friends__nav__button');
    let pets = Array.from(allPetsInfo);
    let petObjects = [];
    let currentPage = 1;
    let startButton = document.querySelector('.our-friends__start__button');
    let backButton = document.querySelector('.our-friends__back__button');
    let forwardButton = document.querySelector('.our-friends__forward__button');
    let endButton = document.querySelector('.our-friends__end__button');
    let numberOfCards;
    let pageNumbers;
    
    preloadImages();

    setLimits();

    for (let i = 0; i < pageNumbers; i++) {
      petObjects.push(shuffleArray(pets));
    }

    createCards(0);

    for (let card of CARDS) {
      card.addEventListener('click', () => {
        let petNameElement = card.querySelector('.our-friends__name');
          createPopupWindow(petNameElement.innerHTML);
      })
    }

    for (let button of OUR_FRIENDS_BTNS) {
      button.addEventListener('click', changePage);
    }

    function preloadImages() {
      const img = new Image();
      img.src = '../../assets/images/charly.png';
      img.src = '../../assets/images/freddie.png';
      img.src = '../../assets/images/jennifer.png';
      img.src = '../../assets/images/katrine.png';
      img.src = '../../assets/images/scarlett.png';
      img.src = '../../assets/images/sophia.png';
      img.src = '../../assets/images/timmy.png';
    }

    function setLimits() {
      if (window.screen.width >= 1280) {
        numberOfCards = 8;
        pageNumbers = 6;
      } else if (window.screen.width >= 768) {
        numberOfCards = 6;
        pageNumbers = 8;
      } else {
        numberOfCards = 3;
        pageNumbers = 16;
      }
    }

    function changePage(event) {
      if (event.target.closest('.our-friends__forward__button')) {
        currentPage += 1;
      } else if (event.target.closest('.our-friends__back__button')) {
        currentPage -= 1;
      } else if (event.target.closest('.our-friends__start__button')) {
        currentPage = 1;
      } else if (event.target.closest('.our-friends__end__button')) {
        currentPage = pageNumbers;
      }
      document.querySelector('.our-friends__current__button').innerHTML = currentPage;
      createCards(currentPage - 1);
      if (currentPage === 1) {
        startButton.classList.add('disabled');
        backButton.classList.add('disabled');
        forwardButton.classList.remove('disabled');
        endButton.classList.remove('disabled');
      } else if (currentPage === pageNumbers) {
        forwardButton.classList.add('disabled');
        endButton.classList.add('disabled');
        startButton.classList.remove('disabled');
        backButton.classList.remove('disabled');
      } else if (currentPage === 2 || currentPage == pageNumbers - 1) {
        for (let button of OUR_FRIENDS_BTNS) {
          button.classList.remove('disabled');
        }
      }

    }

    function createCards (index) {
      for (let i = 0; i < numberOfCards; i++) {
        let card = document.querySelector(`.our-friends__card:nth-child(${i + 1})`);
        let cardImage = card.querySelector('.our-friends__img');
        let cardName = card.querySelector('.our-friends__name');
        cardImage.src = petObjects[index][i].img;
        cardName.innerHTML = petObjects[index][i].name;
      }
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

    function shuffleArray(array) {
      let shuffled = [].concat(array);
      shuffled = shuffled.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, numberOfCards);
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
      event.target.closest('.burger') ||
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
