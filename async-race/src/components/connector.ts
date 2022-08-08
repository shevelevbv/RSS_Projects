import { ICar, INewCar } from '../helpers/interfaces';

class Connector {
  private serverURL: string;

  private garageURL: string;

  private models: Array<string>;

  private makes: Array<string>;

  private numCarsToGenerate: number;

  constructor() {
    this.serverURL = 'http://127.0.0.1:3000/';
    this.garageURL = `${this.serverURL}garage`;
    this.models = ['Volvo', 'Chevrolet', 'Jaguar', 'Peugeot', 'Renault', 'Mustang', 'Fiat', 'Kia', 'Volkswagen', 'Nissan'];
    this.makes = ['Rio', 'F', 'Logan', 'Passat', 'Lacetti', 'XC60', 'GT', 'Panda', 'Beetle', '308'];
    this.numCarsToGenerate = 100;
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

  public generateCars = async () => {
    for (let i = 0; i < this.numCarsToGenerate; i += 1) {
      const model = this.models[Math.round(Math.random() * this.models.length)];
      const make = this.makes[Math.round(Math.random() * this.makes.length)];
      const hexDigits = '0123456789ABCDEF';
      let newColor = '#';
      const hexColorLength = 6;
      for (let j = 0; j < hexColorLength; j += 1) {
        newColor += hexDigits[Math.round(Math.random() * hexDigits.length)];
      }
      this.createCar({ name: `${model} ${make}`, color: newColor });
    }
  };
}

export default Connector;
