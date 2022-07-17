import DataManager from '../src/controller/data-manager';

describe('DataManager class', () => {
  const dataManager = new DataManager();

  const okString = 'cat';
  const notOkString = 'hamster';
  const values = ['dog', 'horse', 'cat'];

  const okNumber = 10.6;
  const notOkNumber = 9.9;
  const range = ['10', '11'];

  jest.spyOn(dataManager, 'isItemInData');
  jest.spyOn(dataManager, 'isInRange');

  it('should return that string item is in array', () => {
    expect(dataManager.isItemInData(okString, values)).toEqual(true);
  });

  it('should return that string item is not in array', () => {
    expect(dataManager.isItemInData(notOkString, values)).toEqual(false);
  });

  it('should return that number is in range of two numbers', () => {
    expect(dataManager.isInRange(okNumber, range)).toEqual(true);
  });

  it('should return that number is not in range of two numbers', () => {
    expect(dataManager.isInRange(notOkNumber, range)).toEqual(false);
  });


});