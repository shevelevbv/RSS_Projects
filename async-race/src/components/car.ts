import createElement from '../helpers/functions';
import { ICar } from '../helpers/interfaces';

class Car {
  private carObject: ICar;

  constructor(carObject: ICar) {
    this.carObject = carObject;
  }

  public renderCar = (requireID: boolean = true): HTMLDivElement => {
    const car: HTMLDivElement = createElement(null, 'div', 'car__icon_container');
    createElement(car, 'div', 'car__inner-layer');
    if (requireID) {
      car.id = `car_${this.carObject.id}`;
    }
    const carIcon: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    carIcon.setAttribute('class', 'icon car__icon');
    carIcon.style.fill = this.carObject.color;
    const useSVG: SVGUseElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useSVG.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '../img/sprite.svg#car');
    carIcon.append(useSVG);
    car.append(carIcon);
    return car;
  };
}

export default Car;
