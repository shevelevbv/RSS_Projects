import { ICar } from '../helpers/interfaces';

class State {
  public cars: Promise<{cars: Array<ICar>, total: number}>;

  constructor(cars: Promise<{cars: Array<ICar>, total: number}>) {
    this.cars = cars;
  }

  public updateState = async (cars: Promise<{cars: Array<ICar>, total: number}>) => {
    await (this.cars = cars);
  };
}

export default State;
