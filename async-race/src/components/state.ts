import { ICar, IWinner } from '../helpers/interfaces';

class State {
  public cars: Promise<{cars: Array<ICar>, total: number}>;

  public winners: Promise<{winners: Array<IWinner>, total: number}>;

  public sortBy: string;

  public sortOrder: string;

  constructor(
    cars: Promise<{cars: Array<ICar>, total: number}>,
    winners: Promise<{winners: Array<IWinner>, total: number}>,
  ) {
    this.cars = cars;
    this.winners = winners;
    this.sortBy = 'time';
    this.sortOrder = 'asc';
  }

  public updateStateCars = async (
    cars: Promise<{cars: Array<ICar>, total: number}>,
  ): Promise<void> => {
    await (this.cars = cars);
  };

  public updateStateWinners = async (
    winners: Promise<{winners: Array<IWinner>, total: number}>,
  ): Promise<void> => {
    await (this.winners = winners);
  };
}

export default State;
