import { ICar } from '../helpers/interfaces';

class Car {
  private carObject: ICar;

  constructor(carObject: ICar) {
    this.carObject = carObject;
  }
}

export default Car;
