import Connector from './connector';
import State from './state';
import Garage from './garage';
import Winners from './winners';
import Page from './page';

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

  public start() {
    this.page = new Page();
    this.page.renderHeader();
    this.page.renderMain();
    this.connector = new Connector();
    this.state = new State(this.connector.getCars());
    this.garage = new Garage();
    this.garage.renderGarage(this.page.main);
    this.garage.renderCarContainers(this.state.cars);
  }
}

export default Controller;
