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

  public raceButton: HTMLButtonElement;

  public resetButton: HTMLButtonElement;

  public generateButton: HTMLButtonElement;

  public backButton: HTMLButtonElement;

  public nextButton: HTMLButtonElement;

  public pageCount: number;

  public static readonly carsPerPage = 7;

  constructor() {
    this.createCarTextInput = createElement(null, 'input', 'input__text');
    this.createCarColorInput = createElement(null, 'input', 'input__color');
    this.createCarButton = createElement(null, 'button', 'button button_create', 'CREATE');
    this.updateCarTextInput = createElement(null, 'input', 'input__text');
    this.updateCarColorInput = createElement(null, 'input', 'input__color');
    this.carControlsContainer = createElement(null, 'div', 'car__objects_container');
    this.updateCarButton = createElement(null, 'button', 'button', 'UPDATE');
    this.raceButton = createElement(null, 'button', 'button', 'RACE');
    this.resetButton = createElement(null, 'button', 'button', 'RESET');
    this.generateButton = createElement(null, 'button', 'button button_generate', 'GENERATE CARS');
    this.backButton = createElement(null, 'button', 'button button_back', 'BACK');
    this.nextButton = createElement(null, 'button', 'button button_next', 'NEXT');
    this.pageCount = 1;
  }

  public renderGarage = (main: HTMLDivElement, total: number): void => {
    const garageContainer = createElement(main, 'div', 'garage-container');
    const createTools = createElement(garageContainer, 'div', 'create-tools_container');
    createTools.append(this.createCarTextInput, this.createCarColorInput, this.createCarButton);

    const updateTools = createElement(garageContainer, 'div', 'update-tools_container');
    this.updateCarTextInput.disabled = true;
    this.updateCarColorInput.disabled = true;
    this.updateCarButton.disabled = true;
    updateTools.append(this.updateCarTextInput, this.updateCarColorInput, this.updateCarButton);

    this.createCarTextInput.type = 'text';
    this.updateCarTextInput.type = 'text';
    this.createCarColorInput.type = 'color';
    this.updateCarColorInput.type = 'color';

    createElement(garageContainer, 'h2', 'title__total', `Garage (${total})`);
    createElement(garageContainer, 'h3', 'title__page', `Page #${this.pageCount}`);

    const actionButtonContainer: HTMLDivElement = createElement(garageContainer, 'div', 'action_button_container');

    actionButtonContainer.append(this.raceButton, this.resetButton, this.generateButton);

    const isFirstPage = this.pageCount === 1;

    if (isFirstPage) {
      this.backButton.disabled = true;
    } else {
      this.backButton.disabled = false;
    }

    if (total <= Garage.carsPerPage * this.pageCount) {
      this.nextButton.disabled = true;
    } else {
      this.nextButton.disabled = false;
    }

    garageContainer.append(this.carControlsContainer);

    const navButtons: HTMLDivElement = createElement(garageContainer, 'div', 'nav-buttons_container');
    navButtons.append(this.backButton, this.nextButton);
  };

  public renderCarContainers = async (carObjects: Promise<{cars: Array<ICar>, total: number}>):
  Promise<void> => {
    this.carControlsContainer.innerHTML = '';
    const { cars } = await carObjects;
    cars.forEach((carObject: ICar): void => this.renderCarContainer(carObject));
  };

  private renderCarContainer = (carObject: ICar): void => {
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
    raceTrack.append(new Car(carObject).renderCar(carObject.id));
    const flagContainer: HTMLDivElement = createElement(raceTrack, 'div', 'flag__icon_container');
    const flagLogo: HTMLImageElement = createElement(flagContainer, 'img', 'flag__icon');
    flagLogo.src = '../img/checkerboard.svg';
  };
}

export default Garage;
