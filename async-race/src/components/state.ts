import { ICar } from '../helpers/interfaces';

class State {
  public cars: Promise<Array<ICar>>;

  constructor(cars: Promise<Array<ICar>>) {
    this.cars = cars;
  }
}

export default State;
