export interface ICard {
  id: number;
  title: string,
  img: string,
  country: string,
  year: number,
  season: string,
  variety: string,
  stock: number,
  favorite: string,
  price: number
}

export interface IFilter {
  country: Array<string>,
  variety: Array<string>,
  season: Array<string>,
  priceRange: Array<string>,
  stockRange: Array<string>,
  favorite: Array<string>;
}