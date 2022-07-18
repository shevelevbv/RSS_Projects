import data from '../src/data';
import DataManager from '../src/controller/data-manager';
import { ICard, IFilter } from '../src/helpers/interfaces';

describe('DataManager class', () => {
  const dataManager: DataManager = new DataManager();
  const filters: IFilter = {
    country: ['China'],
    variety: ['Green'],
    season: [],
    priceRange: ['23', '28'],
    stockRange: ['1', '18'],
    favorite: []
  }

  const expected: Array<ICard> = [
    {
      id: 5,
      title: 'Long Jing',
      img: './img/long-jing.jpg',
      country: 'China',
      year: 2022,
      season: 'Spring',
      variety: 'Green',
      stock: 18,
      favorite: 'yes',
      price: 28
    }
  ];

  it('should return that string item is in array', (): void => {
    expect(dataManager.isItemInData('cat', ['dog', 'horse', 'cat'])).toEqual(true);
  });

  it('should return that string item is not in array', (): void => {
    expect(dataManager.isItemInData('hamster', ['dog', 'horse', 'cat'])).toEqual(false);
  });

  it('should return that number is in range of two numbers', (): void => {
    expect(dataManager.isInRange(10.111, ['10', '11'])).toBe(true);
  });

  it('should return that number is not in range of two numbers', (): void => {
    expect(dataManager.isInRange(9.9999, ['10', '11'])).toBe(false);
  });

  it('should return that substring is in string', (): void => {
    expect(dataManager.isStringInData('cat', 'SuBcAtEgOrY')).toBe(true);
  });

  it('should return that substring is not in string', (): void => {
    expect(dataManager.isStringInData('abc', 'SuBcAtEgOrY')).toBe(false);
  });

  it('should return correct minimum value for a given property', (): void => {
    expect(dataManager.getMinOrMax('price', true)).toBe(5);
  });

  it('should return correct maximum value for a given property', (): void => {
    expect(dataManager.getMinOrMax('stock', false)).toBe(18);
  });

  it('should not return incorrect maximum value for a given property', (): void => {
    expect(dataManager.getMinOrMax('stock', false)).not.toBe(49);
  });

  it('should return a filtered array of card objects', (): void => {
    expect(dataManager.applyFiltersToData(filters, 'ji', 'nameAsc')).toMatchObject(expected);
  });

  it('should return length 0 of an empty array of card objects', (): void => {
    expect(dataManager.applyFiltersToData(filters, 'jit', 'nameAsc')).toHaveLength(0);
  });

  it('should return that subarray is in array', (): void => {
    expect(dataManager.getOriginalData()).toEqual(expect.arrayContaining(expected));
  });

  it('should check if the data object has particular property', (): void => {
    expect(data[0]).toHaveProperty('favorite');
  });

  it('should check if object is instance of particular class', (): void => {
    expect(dataManager).toBeInstanceOf(DataManager);
  });

});