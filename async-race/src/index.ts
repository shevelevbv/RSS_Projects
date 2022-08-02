import './style.css';
import createElement from './helpers/functions';
import { ICar } from './helpers/interfaces';

const colorInput: HTMLInputElement = createElement(document.body, 'input', 'input__color');
colorInput.type = 'color';

function renderCar(carObject: ICar) {
  const carContainer: HTMLDivElement = createElement(document.body, 'div', 'container');
  const carControls: HTMLDivElement = createElement(carContainer, 'div', 'car__controls');
  createElement(carControls, 'button', 'car__button_select', 'SELECT');
  createElement(carControls, 'button', 'car__button_remove', 'REMOVE');
  createElement(carControls, 'span', 'car__span_name', carObject.name);
  const raceTrackContainer: HTMLDivElement = createElement(carContainer, 'div', 'car__track_container');
  createElement(raceTrackContainer, 'button', 'button button_start', 'A');
  createElement(raceTrackContainer, 'button', 'button button_stop', 'B');
  const raceTrack: HTMLDivElement = createElement(raceTrackContainer, 'div', 'car__track');
  const SVGContainer: HTMLDivElement = createElement(raceTrack, 'div', 'car__svg_container');
  const car: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  car.setAttribute('class', 'icon car');
  car.style.fill = carObject.color;
  const useSVG: SVGUseElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  useSVG.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '../img/sprite.svg#car');
  car.append(useSVG);
  SVGContainer.append(car);

  colorInput.addEventListener('change', () => {
    car.style.fill = colorInput.value;
  });
}

async function getCars() {
  const response: Response = await fetch('http://127.0.0.1:3000/garage');
  const data: Array<ICar> = await response.json();

  data.forEach((carObject: ICar): void => renderCar(carObject));
}

getCars();
