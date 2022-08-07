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
    this.garage.createCarButton.addEventListener('click', this.renderCreatedCars);
  };

  private renderCreatedCars = async () => {
    const newCar: INewCar = {
      name: this.garage.createCarTextInput.value,
      color: this.garage.createCarColorInput.value,
    };
    await this.connector.createCar(newCar);
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
