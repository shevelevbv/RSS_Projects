import createElement from '../helpers/functions';
import Car from './car';
import { ICar } from '../helpers/interfaces';
import '../style.css';

class Garage {
  public createCarTextInput: HTMLInputElement;

  public createCarColorInput: HTMLInputElement;

  public createCarButton: HTMLButtonElement;

  public updateCarTextInput: HTMLInputElement;

  public updateCarColorInput: HTMLInputElement;

  public updateCarButton: HTMLButtonElement;

  public carControlsContainer: HTMLDivElement;

  public backButton: HTMLButtonElement;

  public nextButton: HTMLButtonElement;

  constructor() {
    this.createCarTextInput = createElement(null, 'input', 'input__text');
    this.createCarColorInput = createElement(null, 'input', 'input__color');
    this.createCarButton = createElement(null, 'button', 'button', 'CREATE');
    this.updateCarTextInput = createElement(null, 'input', 'input__text');
    this.updateCarColorInput = createElement(null, 'input', 'input__color');
    this.carControlsContainer = createElement(null, 'div', 'car__objects_container');
    this.updateCarButton = createElement(null, 'button', 'button', 'UPDATE');
    this.backButton = createElement(null, 'button', 'button', 'BACK');
    this.nextButton = createElement(null, 'button', 'button', 'NEXT');
  }

  public renderGarage(main: HTMLDivElement) {
    const createTools = createElement(main, 'div', 'create-tools_container');
    createTools.append(this.createCarTextInput, this.createCarColorInput, this.createCarButton);

    const updateTools = createElement(main, 'div', 'update-tools_container');
    updateTools.append(this.updateCarTextInput, this.updateCarColorInput, this.updateCarButton);

    this.createCarTextInput.type = 'text';
    this.updateCarTextInput.type = 'text';
    this.createCarColorInput.type = 'color';
    this.updateCarColorInput.type = 'color';

    main.append(this.carControlsContainer);

    const navButtons: HTMLDivElement = createElement(main, 'div', 'nav-buttons_container');
    navButtons.append(this.backButton, this.nextButton);
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
