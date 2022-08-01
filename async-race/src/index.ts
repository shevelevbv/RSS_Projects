import './style.css';
import createElement from './helpers/functions';

const colorInput: HTMLInputElement = createElement(document.body, 'input', 'input__color');
colorInput.type = 'color';

const carContainer: HTMLDivElement = createElement(document.body, 'div', 'container');
const carControls: HTMLDivElement = createElement(carContainer, 'div', 'car__controls');
createElement(carControls, 'button', 'car__button_select', 'SELECT');
createElement(carControls, 'button', 'car__button_remove', 'REMOVE');
createElement(carControls, 'span', 'car__span_name', 'Tesla');
const SVGContainer: HTMLDivElement = createElement(carContainer, 'div', 'car__svg_container');
const car: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
car.setAttribute('class', 'icon car');
const useSVG: SVGUseElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');
useSVG.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '../img/sprite.svg#car');
car.append(useSVG);
SVGContainer.append(car);

colorInput.addEventListener('change', () => {
  car.style.fill = colorInput.value;
});
