import Connector from './connector';
import State from './state';

class Controller {
  private connector: Connector | null;

  private state: State | null;

  constructor() {
    this.connector = null;
    this.state = null;
  }

  public start() {
    this.connector = new Connector();
    this.state = new State(this.connector.getCars());
  }
}

export default Controller;
