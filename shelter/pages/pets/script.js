const HEADER = document.querySelector(".header");
const BODY = document.body;

HEADER.addEventListener("click", toggleOpenClass);

function toggleOpenClass(event) {
  if (
    event.target.classList.contains("burger") ||
    event.target.classList.contains("burger__line") ||
    event.target.classList.contains("nav__link") ||
    event.target.classList.contains("page-mask")
  ) {
    if (!BODY.classList.contains('open')) {
      disablePage('open');
    } else {
      enablePage('open');
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