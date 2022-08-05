import { ICar, INewCar } from '../helpers/interfaces';

class Connector {
  private serverURL: string;

  private garageURL: string;

  constructor() {
    this.serverURL = 'http://127.0.0.1:3000/';
    this.garageURL = `${this.serverURL}garage`;
  }

  public async getCars(): Promise<Array<ICar>> {
    const response: Response = await fetch(this.garageURL);
    const data: Promise<Array<ICar>> = await response.json();
    return data;
  }

  public async createCar(car: INewCar): Promise<void> {
    await fetch(this.garageURL, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(car),
    });
  }
}

export default Connector;
