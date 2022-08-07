import { ICar, INewCar } from '../helpers/interfaces';

class Connector {
  private serverURL: string;

  private garageURL: string;

  constructor() {
    this.serverURL = 'http://127.0.0.1:3000/';
    this.garageURL = `${this.serverURL}garage`;
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

  public deleteCar = async (id: number): Promise<void> => {
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
}

export default Connector;
