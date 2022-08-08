import Connector from './connector';
import State from './state';
import Garage from './garage';
import Winners from './winners';
import Page from './page';
import { ICar, INewCar } from '../helpers/interfaces';

class Controller {
  private connector: Connector;

  private state: State;

  private garage: Garage;

  private winners: Winners;

  private page: Page;

  private id: number;

  constructor() {
    this.page = new Page();
    this.connector = new Connector();
    this.garage = new Garage();
    this.state = new State(this.connector.getCars(this.garage.pageCount, this.garage.carsPerPage));
    this.winners = new Winners();
    this.id = 0;
  }

  public start = (): void => {
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

  private addListeners = (): void => {
    this.garage.createCarButton.addEventListener('click', this.createCar);
    this.garage.updateCarButton.addEventListener('click', this.updateCar);
    this.page.main.addEventListener('click', this.handleEventsOnMain);
  };

  private handleEventsOnMain = (e: MouseEvent): void => {
    if ((e.target as HTMLElement).classList.contains('car__button_select')) {
      this.selectCar(e);
    } else if ((e.target as HTMLElement).classList.contains('car__button_remove')) {
      this.removeCar(e);
    } else if ((e.target as HTMLElement).classList.contains('button_next')) {
      this.garage.pageCount += 1;
      this.renderUpdatedCars();
    } else if ((e.target as HTMLElement).classList.contains('button_back')) {
      this.garage.pageCount -= 1;
      this.renderUpdatedCars();
    } else if ((e.target as HTMLElement).classList.contains('button_generate')) {
      this.connector.generateCars();
      this.renderUpdatedCars();
    }
  };

  private selectCar = async (e: MouseEvent): Promise<void> => {
    this.id = Number((e.target as HTMLElement).id.split('button_select_')[1]);
    const car: ICar = await this.connector.getCar(this.id);
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
    await this.connector.updateCar(this.id, newCar);
    this.renderUpdatedCars();
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
      this.garage.carsPerPage,
    ));
    this.page.resetMain();
    const { total: carsTotal } = await this.state.cars;
    this.garage.renderGarage(this.page.main, carsTotal);
    await this.garage.renderCarContainers(this.state.cars);
  };

  private operateInWinners = (): void => {
    this.page.resetMain();
  };
}

export default Controller;
