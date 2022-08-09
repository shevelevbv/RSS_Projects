import {
  ICar, INewCar, ICarData, IWinner,
} from '../helpers/interfaces';
import carModels from './car-models';

class Connector {
  private serverURL: string;

  private garageURL: string;

  private engineURL: string;

  private winnerURL: string;

  private static readonly numCarsToGenerate = 100;

  private static readonly engineStatuses = {
    started: 'started',
    drive: 'drive',
    stopped: 'stopped',
  };

  private static readonly HTTPMethods = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    patch: 'PATCH',
    delete: 'DELETE',
  };

  private static readonly sortFeatures = {
    id: 'id',
    wins: 'wins',
    time: 'time',
  };

  private static readonly sortOrder = {
    asc: 'ASC',
    desc: 'DESC',
  };

  private static readonly contentTypes = {
    applicationJson: 'application/json',
  };

  private static readonly statusSuccess = 200;

  constructor() {
    this.serverURL = 'http://127.0.0.1:3000/';
    this.garageURL = `${this.serverURL}garage`;
    this.engineURL = `${this.serverURL}engine`;
    this.winnerURL = `${this.serverURL}winners`;
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
      method: Connector.HTTPMethods.post,
      body: JSON.stringify(car),
      headers: {
        'Content-Type': Connector.contentTypes.applicationJson,
      },
    });
  };

  public removeCar = async (id: number): Promise<void> => {
    await fetch(`${this.garageURL}/${id}`, {
      method: Connector.HTTPMethods.delete,
    });
  };

  public updateCar = async (id: number, car: INewCar): Promise<void> => {
    await fetch(`${this.garageURL}/${id}`, {
      method: Connector.HTTPMethods.put,
      body: JSON.stringify(car),
      headers: {
        'Content-Type': Connector.contentTypes.applicationJson,
      },
    });
  };

  public generateCars = async (): Promise<void> => {
    await Promise.all(Connector.makeCars()
      .map(async (car: INewCar): Promise<void> => this.createCar(car)));
  };

  public startEngine = async (id: number): Promise<ICarData> => {
    const response: Response = await fetch(
      `${this.engineURL}?id=${id}&status=${Connector.engineStatuses.started}`,
      {
        method: Connector.HTTPMethods.patch,
      },
    );
    return response.json();
  };

  public stopEngine = async (id: number): Promise<ICarData> => {
    const response: Response = await fetch(
      `${this.engineURL}?id=${id}&status=${Connector.engineStatuses.stopped}`,
      {
        method: Connector.HTTPMethods.patch,
      },
    );
    return response.json();
  };

  public moveCar = async (id: number): Promise<{success: boolean}> => {
    const response: Response = await fetch(
      `${this.engineURL}?id=${id}&status=${Connector.engineStatuses.drive}`,
      {
        method: Connector.HTTPMethods.patch,
      },
    )
      .catch();
    return response.status === Connector.statusSuccess ? response.json()
      : { success: false };
  };

  public getWinners = async (
    page: number,
    limit: number,
    sort: string = Connector.sortFeatures.time,
    order: string = Connector.sortOrder.asc,
  ): Promise<{winners: Array<IWinner>, total: number}> => {
    const response: Response = await fetch(`${this.winnerURL}?_page=${page}&_limit=${limit}&_sort=${sort}&order=${order}`);

    return {
      winners: await response.json(),
      total: Number(response.headers.get('X-Total-Count')),
    };
  };

  public getWinner = async (id: number): Promise<IWinner> => {
    const response = await fetch(`${this.winnerURL}/${id}`);
    return response.json();
  };

  public createWinner = async (car: IWinner): Promise<void> => {
    await fetch(this.winnerURL, {
      method: Connector.HTTPMethods.post,
      body: JSON.stringify(car),
      headers: {
        'Content-Type': Connector.contentTypes.applicationJson,
      },
    });
  };

  public removeWinner = async (id: number): Promise<void> => {
    await fetch(`${this.winnerURL}/${id}`, {
      method: Connector.HTTPMethods.delete,
    });
  };

  public updateWinner = async (id: number, winner: IWinner): Promise<void> => {
    await fetch(`${this.winnerURL}/${id}`, {
      method: Connector.HTTPMethods.put,
      body: JSON.stringify(winner),
      headers: {
        'Content-Type': Connector.contentTypes.applicationJson,
      },
    });
  };

  private static makeCars = (): Array<INewCar> => {
    const cars: Array<INewCar> = [];
    for (let i: number = 0; i < Connector.numCarsToGenerate; i += 1) {
      const model: string = carModels.models[Math.floor(Math.random() * carModels.models.length)];
      const make: string = carModels.makes[Math.floor(Math.random() * carModels.makes.length)];
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
}

export default Connector;
