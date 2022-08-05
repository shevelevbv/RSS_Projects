import createElement from '../helpers/functions';
import Car from './car';
import { ICar } from '../helpers/interfaces';
import '../style.css';

class Garage {
  public updateCarColorInput: HTMLInputElement;

  public carControlsContainer: HTMLDivElement;

  constructor() {
    this.updateCarColorInput = createElement(document.body, 'input', 'input__color');
    this.updateCarColorInput.type = 'color';
    this.carControlsContainer = createElement(document.body, 'div', 'car__objects_container');
  }

  public async renderCarContainers(carObjects: Promise<Array<ICar>>): Promise<void> {
    const cars = await carObjects;
    cars.forEach((carObject: ICar): void => this.renderCarContainer(carObject));
  }

  private renderCarContainer(carObject: ICar): void {
    const carContainer: HTMLDivElement = createElement(this.carControlsContainer, 'div', 'container');
    const carControls: HTMLDivElement = createElement(carContainer, 'div', 'car__controls');
    createElement(carControls, 'button', 'car__button_select', 'SELECT');
    createElement(carControls, 'button', 'car__button_remove', 'REMOVE');
    createElement(carControls, 'span', 'car__span_name', carObject.name);
    const raceTrackContainer: HTMLDivElement = createElement(carContainer, 'div', 'car__track_container');
    createElement(raceTrackContainer, 'button', 'button button_start', 'A');
    createElement(raceTrackContainer, 'button', 'button button_stop', 'B');
    const raceTrack: HTMLDivElement = createElement(raceTrackContainer, 'div', 'car__track');
    const SVGContainer: HTMLDivElement = createElement(raceTrack, 'div', 'car__svg_container');
    SVGContainer.append(new Car(carObject).renderCar());
  }
}

export default Garage;
