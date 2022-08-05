import Connector from './connector';
import State from './state';
import Garage from './garage';
import Winners from './winners';
import Page from './page';
import { checkForNull } from '../helpers/functions';
import { INewCar } from '../helpers/interfaces';

class Controller {
  private connector: Connector | null;

  private state: State | null;

  private garage: Garage | null;

  private winners: Winners | null;

  private page: Page | null;

  constructor() {
    this.connector = null;
    this.state = null;
    this.garage = null;
    this.winners = null;
    this.page = null;
  }

  public start(): void {
    this.page = new Page();
    this.page.renderHeader();
    this.page.renderMain();
    this.connector = new Connector();
    this.state = new State(this.connector.getCars());
    this.garage = new Garage();
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
    this.garage = checkForNull(this.garage);
    this.page = checkForNull(this.page);
    this.state = checkForNull(this.state);
    this.connector = checkForNull(this.connector);
    this.page.resetMain();
    this.garage.renderGarage(this.page.main);
    this.garage.renderCarContainers(this.state.cars);

    this.garage.createCarButton.addEventListener('click', () => {
      this.connector = checkForNull(this.connector);
      this.state = checkForNull(this.state);
      this.garage = checkForNull(this.garage);
      this.page = checkForNull(this.page);
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
