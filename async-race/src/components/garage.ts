import createElement from '../helpers/functions';
import Car from './car';
import { ICar } from '../helpers/interfaces';
import '../style.scss';

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

  public carsPerPage = 7;

  public pageCount = 1;

  constructor() {
    this.createCarTextInput = createElement(null, 'input', 'input__text');
    this.createCarColorInput = createElement(null, 'input', 'input__color');
    this.createCarButton = createElement(null, 'button', 'button button_create', 'CREATE');
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
    this.updateCarTextInput.disabled = true;
    this.updateCarColorInput.disabled = true;
    this.updateCarButton.disabled = true;
    updateTools.append(this.updateCarTextInput, this.updateCarColorInput, this.updateCarButton);

    this.createCarTextInput.type = 'text';
    this.updateCarTextInput.type = 'text';
    this.createCarColorInput.type = 'color';
    this.updateCarColorInput.type = 'color';

    main.append(this.carControlsContainer);

    const navButtons: HTMLDivElement = createElement(main, 'div', 'nav-buttons_container');
    navButtons.append(this.backButton, this.nextButton);
  }

  public async renderCarContainers(carObjects: Promise<{cars: Array<ICar>, total: number}>):
  Promise<void> {
    this.carControlsContainer.innerHTML = '';
    const { cars } = await carObjects;
    cars.forEach((carObject: ICar): void => this.renderCarContainer(carObject));
  }

  private renderCarContainer(carObject: ICar): void {
    const carContainer: HTMLDivElement = createElement(this.carControlsContainer, 'div', 'container');
    const carControls: HTMLDivElement = createElement(carContainer, 'div', 'car__controls');
    const selectButton: HTMLButtonElement = createElement(carControls, 'button', 'car__button_select', 'SELECT');
    selectButton.id = `button_select_${carObject.id}`;
    const removeButton: HTMLButtonElement = createElement(carControls, 'button', 'car__button_remove', 'REMOVE');
    removeButton.id = `button_remove_${carObject.id}`;
    createElement(carControls, 'span', 'car__span_name', carObject.name);
    const raceTrackContainer: HTMLDivElement = createElement(carContainer, 'div', 'car__track_container');
    createElement(raceTrackContainer, 'button', 'button button_start', 'A');
    createElement(raceTrackContainer, 'button', 'button button_stop', 'B');
    const raceTrack: HTMLDivElement = createElement(raceTrackContainer, 'div', 'car__track');
    const SVGContainer: HTMLDivElement = createElement(raceTrack, 'div', 'car__svg_container');
    SVGContainer.append(new Car(carObject).renderCar(carObject.id));
  }
}

export default Garage;
