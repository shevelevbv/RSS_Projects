export interface ICar {
  name: string,
  color: string,
  id: number
}

export interface INewCar {
  name: string;
  color: string;
}

export interface ICarData {
  velocity: number;
  distance: number;
}

export interface ICoordinates {
  x: number;
  y: number;
}

export interface ISuccessData {
  success: boolean;
  id: number;
  time: number;
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export interface INewWinner {
  id: number;
  time: number;
}
