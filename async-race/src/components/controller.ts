import Connector from './connector';
import State from './state';
import Garage from './garage';
import Winners from './winners';

class Controller {
  private connector: Connector | null;

  private state: State | null;

  private garage: Garage | null;

  private winners: Winners | null;

  constructor() {
    this.connector = null;
    this.state = null;
    this.garage = null;
    this.winners = null;
  }

  public start() {
    this.connector = new Connector();
    this.state = new State(this.connector.getCars());
    this.garage = new Garage();
    this.garage.renderCarContainers(this.state.cars);
  }
}

export default Controller;
