import { ICar } from '../helpers/interfaces';

class Car {
  private carObject: ICar;

  constructor(carObject: ICar) {
    this.carObject = carObject;
  }

  public renderCar(): SVGSVGElement {
    const car: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    car.setAttribute('class', 'icon car');
    car.style.fill = this.carObject.color;
    const useSVG: SVGUseElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useSVG.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '../img/sprite.svg#car');
    car.append(useSVG);
    return car;
  }
}

export default Car;
