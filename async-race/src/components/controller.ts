import Connector from './connector';
import State from './state';
import Garage from './garage';
import Winners from './winners';
import Page from './page';
import { INewCar } from '../helpers/interfaces';

class Controller {
  private connector: Connector;

  private state: State;

  private garage: Garage;

  private winners: Winners;

  private page: Page;

  constructor() {
    this.page = new Page();
    this.connector = new Connector();
    this.garage = new Garage();
    this.state = new State(this.connector.getCars(this.garage.pageCount, this.garage.carsPerPage));
    this.winners = new Winners();
  }

  public start(): void {
    this.page.renderHeader();
    this.page.renderMain();
    this.selectView();
  }

  private selectView = () => {
    this.page.toGarageButton.addEventListener('click', this.operateInGarage);
    this.page.toWinnersButton.addEventListener('click', this.operateInWinners);
    this.operateInGarage();
  };

  private operateInGarage = async () => {
    this.page.resetMain();
    this.garage.renderGarage(this.page.main);
    await this.garage.renderCarContainers(this.state.cars);

    this.addListeners();
  };

  private addListeners = () => {
    this.garage.createCarButton.addEventListener('click', this.createCar);
    this.page.main.addEventListener('click', (e: MouseEvent) => {
      this.handleEventsOnMain(e);
    });
  };

  private handleEventsOnMain = (e: MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('car__button_select')) {
      this.selectCar(e);
    } else if ((e.target as HTMLElement).classList.contains('car__button_remove')) {
      this.removeCar(e);
    }
  };

  private selectCar = async (e: MouseEvent) => {
    const carID = Number((e.target as HTMLElement).id.split('button_select_')[1]);
    const car = await this.connector.getCar(carID);
    this.garage.updateCarTextInput.value = car.name;
    this.garage.updateCarColorInput.value = car.color;
    this.garage.updateCarTextInput.disabled = false;
    this.garage.updateCarColorInput.disabled = false;
    this.garage.updateCarButton.disabled = false;
    this.garage.updateCarButton.addEventListener('click', async () => {
      this.updateCar(carID);
    });
  };

  private createCar = async () => {
    const newCar: INewCar = {
      name: this.garage.createCarTextInput.value,
      color: this.garage.createCarColorInput.value,
    };
    await this.connector.createCar(newCar);
    this.renderUpdatedCars();
  };

  private updateCar = async (carID: number) => {
    const newCar: INewCar = {
      name: this.garage.updateCarTextInput.value,
      color: this.garage.updateCarColorInput.value,
    };
    await this.connector.updateCar(carID, newCar);
    this.renderUpdatedCars();
    this.garage.updateCarTextInput.disabled = true;
    this.garage.updateCarColorInput.disabled = true;
    this.garage.updateCarTextInput.value = '';
    this.garage.updateCarColorInput.value = '#000000';
    this.garage.updateCarButton.disabled = true;
    this.garage.updateCarButton.removeEventListener('click', async () => {
      this.updateCar(carID);
    });
  };

  private removeCar = async (e: MouseEvent) => {
    const carID = Number((e.target as HTMLElement).id.split('button_remove_')[1]);
    await this.connector.removeCar(carID);
    this.renderUpdatedCars();
  };

  private renderUpdatedCars = async () => {
    await this.state.updateState(this.connector.getCars(
      this.garage.pageCount,
      this.garage.carsPerPage,
    ));
    await this.garage.renderCarContainers(this.state.cars);
  };

  private operateInWinners = async () => {
    this.page.resetMain();
  };
}

export default Controller;
