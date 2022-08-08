import { ICar, INewCar, ICarData } from '../helpers/interfaces';

class Connector {
  private serverURL: string;

  private garageURL: string;

  private engineURL: string;

  private models: Array<string>;

  private makes: Array<string>;

  private static readonly numCarsToGenerate = 100;

  private static readonly engineStatuses = { started: 'started', drive: 'drive', stopped: 'stopped' };

  private static readonly statusSuccess = 200;

  constructor() {
    this.serverURL = 'http://127.0.0.1:3000/';
    this.garageURL = `${this.serverURL}garage`;
    this.engineURL = `${this.serverURL}engine`;
    this.models = ['Volvo', 'Chevrolet', 'Jaguar', 'Peugeot', 'Renault', 'Mustang', 'Fiat', 'Kia', 'Volkswagen', 'Nissan'];
    this.makes = ['Rio', 'F', 'Logan', 'Passat', 'Lacetti', 'XC60', 'GT', 'Panda', 'Beetle', '308'];
  }

  public getCars = async (page: number, limit: number):
  Promise<{cars: Array<ICar>, total: number}> => {
    const response = await fetch(`${this.garageURL}?_page=${page}&_limit=${limit}`);

    return {
      cars: await response.json(),
      total: Number(response.headers.get('X-Total-Count')),
    };
  };

  public getCar = async (id: number): Promise<ICar> => {
    const response = await fetch(`${this.garageURL}/${id}`);
    return response.json();
  };

  public createCar = async (car: INewCar): Promise<void> => {
    await fetch(this.garageURL, {
      method: 'POST',
      body: JSON.stringify(car),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  public removeCar = async (id: number): Promise<void> => {
    await fetch(`${this.garageURL}/${id}`, {
      method: 'DELETE',
    });
  };

  public updateCar = async (id: number, car: INewCar): Promise<void> => {
    await fetch(`${this.garageURL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(car),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  private makeCars = (): Array<INewCar> => {
    const cars: Array<INewCar> = [];
    for (let i: number = 0; i < Connector.numCarsToGenerate; i += 1) {
      const model: string = this.models[Math.floor(Math.random() * this.models.length)];
      const make: string = this.makes[Math.floor(Math.random() * this.makes.length)];
      const hexDigits: string = '0123456789ABCDEF';
      let newColor: string = '#';
      const hexColorLength: number = 6;
      for (let j: number = 0; j < hexColorLength; j += 1) {
        newColor += hexDigits[Math.floor(Math.random() * hexDigits.length)];
      }
      cars.push({ name: `${model} ${make}`, color: newColor });
    }
    return cars;
  };

  public generateCars = async (): Promise<void> => {
    Promise.all(this.makeCars().map(async (car: INewCar): Promise<void> => this.createCar(car)));
  };

  public startEngine = async (id: number): Promise<ICarData> => {
    const response: Response = await fetch(
      `${this.engineURL}?id=${id}&status=${Connector.engineStatuses.started}`,
      {
        method: 'PATCH',
      },
    );
    return response.json();
  };

  public moveCar = async (id: number): Promise<{success: boolean}> => {
    const response: Response = await fetch(
      `${this.engineURL}?id=${id}&status=${Connector.engineStatuses.drive}`,
      {
        method: 'PATCH',
      },
    )
      .catch();
    return response.status === Connector.statusSuccess ? { ...response.json() }
      : { success: false };
  };
}

export default Connector;
