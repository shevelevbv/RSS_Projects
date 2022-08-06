import Connector from './connector';
import State from './state';
import Garage from './garage';
import Winners from './winners';
import Page from './page';
import { checkForNull } from '../helpers/functions';
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
    this.state = new State(this.connector.getCars());
    this.garage = new Garage();
    this.winners = new Winners();
  }

  public start(): void {
    this.page.renderHeader();
    this.page.renderMain();
    this.selectView();
  }

  private selectView() {
    this.page = checkForNull(this.page);
    this.page.toGarageButton.addEventListener('click', () => {
      this.operateInGarage();
    });
    this.page.toWinnersButton.addEventListener('click', () => {
      this.operateInWinners();
    });
    this.operateInGarage();
  }

  private operateInGarage() {
    this.page.resetMain();
    this.garage.renderGarage(this.page.main);
    this.garage.renderCarContainers(this.state.cars);

    this.garage.createCarButton.addEventListener('click', () => {
      const newCar: INewCar = {
        name: this.garage.createCarTextInput.value as string,
        color: this.garage.createCarColorInput.value as string,
      };
      this.connector.createCar(newCar);
      this.state.cars = this.connector.getCars();
      this.page.resetMain();
      this.garage.renderGarage(this.page.main);
      this.garage.renderCarContainers(this.state.cars);
    });
  }

  private operateInWinners() {
    this.page = checkForNull(this.page);
    this.page.resetMain();
  }
}

export default Controller;
