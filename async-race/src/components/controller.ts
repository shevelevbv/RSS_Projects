import Connector from './connector';
import State from './state';
import Garage from './garage';
import Winners from './winners';
import Page from './page';
import {
  ICar, ICarData, ICoordinates, INewCar,
} from '../helpers/interfaces';

class Controller {
  private connector: Connector;

  private state: State;

  private garage: Garage;

  private winners: Winners;

  private page: Page;

  private carId: number;

  private animationID: {id: number};

  constructor() {
    this.page = new Page();
    this.connector = new Connector();
    this.garage = new Garage();
    this.state = new State(this.connector.getCars(this.garage.pageCount, Garage.carsPerPage));
    this.winners = new Winners();
    this.carId = 0;
    this.animationID = { id: 0 };
  }

  public startApp = (): void => {
    this.page.renderHeader();
    this.page.renderMain();
    this.selectView();
  };

  private selectView = (): void => {
    this.page.toGarageButton.addEventListener('click', this.operateInGarage);
    this.page.toWinnersButton.addEventListener('click', this.operateInWinners);
    this.addListeners();
    this.operateInGarage();
  };

  private operateInGarage = (): void => {
    this.renderUpdatedCars();
  };

  private operateInWinners = (): void => {
    this.page.resetMain();
  };

  private addListeners = (): void => {
    this.garage.createCarButton.addEventListener('click', this.createCar);
    this.garage.updateCarButton.addEventListener('click', this.updateCar);
    this.page.main.addEventListener('click', this.handleEventsOnMain);
  };

  private handleEventsOnMain = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('car__button_select')) {
      this.selectCar(e);
    } else if (target.classList.contains('car__button_remove')) {
      this.removeCar(e);
    } else if (target.classList.contains('button_next')) {
      this.garage.pageCount += 1;
      this.renderUpdatedCars();
    } else if (target.classList.contains('button_back')) {
      this.garage.pageCount -= 1;
      this.renderUpdatedCars();
    } else if (target.classList.contains('button_generate')) {
      this.connector.generateCars();
      this.renderUpdatedCars();
    } else if (target.classList.contains('button_start')) {
      const id: number = Number(target.id.split('button_start_')[1]);
      this.start(id);
    } else if (target.classList.contains('button_stop')) {
      this.carId = Number(target.id.split('button_stop_')[1]);
      const startButton = document.getElementById(`button_start_${this.carId}`);
      const stopButton = document.getElementById(`button_stop_${this.carId}`);
      (startButton as HTMLButtonElement).disabled = false;
      (stopButton as HTMLButtonElement).disabled = true;
    }
  };

  private selectCar = async (e: MouseEvent): Promise<void> => {
    this.carId = Number((e.target as HTMLElement).id.split('button_select_')[1]);
    const car: ICar = await this.connector.getCar(this.carId);
    this.garage.updateCarTextInput.value = car.name;
    this.garage.updateCarColorInput.value = car.color;
    this.garage.updateCarTextInput.disabled = false;
    this.garage.updateCarColorInput.disabled = false;
    this.garage.updateCarButton.disabled = false;
  };

  private createCar = async (): Promise<void> => {
    const newCar: INewCar = {
      name: this.garage.createCarTextInput.value,
      color: this.garage.createCarColorInput.value,
    };
    await this.connector.createCar(newCar);
    this.renderUpdatedCars();
  };

  private updateCar = async (): Promise<void> => {
    const newCar: INewCar = {
      name: this.garage.updateCarTextInput.value,
      color: this.garage.updateCarColorInput.value,
    };
    await this.connector.updateCar(this.carId, newCar);
    await this.renderUpdatedCars();
    this.garage.updateCarTextInput.disabled = true;
    this.garage.updateCarColorInput.disabled = true;
    this.garage.updateCarTextInput.value = '';
    this.garage.updateCarColorInput.value = '#000000';
    this.garage.updateCarButton.disabled = true;
  };

  private removeCar = async (e: MouseEvent): Promise<void> => {
    const carID = Number((e.target as HTMLElement).id.split('button_remove_')[1]);
    await this.connector.removeCar(carID);
    this.renderUpdatedCars();
  };

  private renderUpdatedCars = async (): Promise<void> => {
    await this.state.updateState(this.connector.getCars(
      this.garage.pageCount,
      Garage.carsPerPage,
    ));
    this.page.resetMain();
    const { total: carsTotal } = await this.state.cars;
    this.garage.renderGarage(this.page.main, carsTotal);
    await this.garage.renderCarContainers(this.state.cars);
  };

  private start = async (id: number) => {
    const startButton = document.getElementById(`button_start_${id}`);
    const stopButton = document.getElementById(`button_stop_${id}`);
    (startButton as HTMLButtonElement).disabled = true;
    (stopButton as HTMLButtonElement).disabled = false;

    const { velocity: carVelocity, distance: carDistance }:
    ICarData = await this.connector.startEngine(id);

    const time: number = Math.round(carDistance / carVelocity);

    const car = document.getElementById(`car_${id}`) as HTMLElement;
    const flag = document.getElementById(`flag_${id}`) as HTMLElement;

    const distance: number = Controller.getDistanceBetweenElements(car, flag);
    this.animationID = Controller.animate(car, distance, time);

    const { success } = await this.connector.moveCar(id);
    if (!success) {
      window.cancelAnimationFrame(this.animationID.id);
    }

    return { success, id, time };
  };

  private static animate = (car: HTMLElement, distance: number, time: number) => {
    const currentCar = car;
    let startTime = 0;
    const state: { id: number } = { id: 0 };

    const makeStep = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime;
      }
      const timePassed = currentTime - startTime;
      const distancePassed: number = Math.round((timePassed / time) * distance);

      currentCar.style.transform = `translateX(${Math.min(distancePassed, distance)}px)`;

      if (distancePassed < distance) {
        state.id = window.requestAnimationFrame(makeStep);
      }
    };

    state.id = window.requestAnimationFrame(makeStep);

    return state;
  };

  private static getPositionAtCenter = (element: HTMLElement): ICoordinates => {
    const {
      top, left, width, height,
    } = element.getBoundingClientRect();
    return {
      x: left + width / 2,
      y: top + height / 2,
    };
  };

  private static getDistanceBetweenElements = (left: HTMLElement, right: HTMLElement): number => {
    const leftPosition = Controller.getPositionAtCenter(left);
    const rightPosition = Controller.getPositionAtCenter(right);

    return Math.hypot(leftPosition.x - rightPosition.x, leftPosition.y - rightPosition.y);
  };
}

export default Controller;
