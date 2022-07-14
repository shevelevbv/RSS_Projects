export interface ICard {
  id: number;
  title: string,
  img: string,
  country: string,
  year: number,
  variety: string,
  stock: number,
  favorite: boolean,
  price: number
}

export interface IFilter {
  country: Array<string>,
  variety: Array<string>,
  favorite?: boolean;
}