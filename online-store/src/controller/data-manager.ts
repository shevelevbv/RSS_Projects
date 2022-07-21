import data from '../data';
import { ICard, IFilter } from '../helpers/interfaces';

class DataManager {
  private originalData: Array<ICard>;

  constructor() {
    this.originalData = data; 
  }

  public getOriginalData(): Array<ICard> {
    return [...this.originalData];
  }

  public isItemInData(testValue: string, values: Array<string>): boolean {
    return !values.length || values.includes(testValue);
  }

  public isStringInData(testString: string, title: string): boolean {
    return !testString || title.toLowerCase().includes(testString.toLowerCase());
  }

  public isInRange(testValue: number, range: Array<string>): boolean {
    return testValue >= parseInt(range[0]) && testValue <= parseInt(range[1]);
  }

  private compareValues(firstCard: ICard, secondCard: ICard, algorithm: string): number {
    switch (algorithm) {
      case 'nameAsc': return firstCard.title.localeCompare(secondCard.title);
      case 'nameDesc': return secondCard.title.localeCompare(firstCard.title);
      case 'yearAsc': return firstCard.year - secondCard.year;
      case 'yearDesc': return secondCard.year - firstCard.year;
      case 'priceAsc': return firstCard.price - secondCard.price;
      case 'priceDesc': return secondCard.price - firstCard.price;
      default: return 0;
    }
  }

  public applyFiltersToData(filters: IFilter, testString: string, algorithm: string): Array<ICard> {
    return this.originalData.filter((obj: ICard): boolean => this.isItemInData(obj.country, filters.country)
                                                          && this.isItemInData(obj.variety, filters.variety)
                                                          && this.isItemInData(obj.season, filters.season)
                                                          && this.isInRange(obj.price, filters.priceRange)
                                                          && this.isInRange(obj.stock, filters.stockRange)
                                                          && this.isItemInData(obj.favorite, filters.favorite)
                                                          && this.isStringInData(testString, obj.title)
                                    )
                            .sort((firstCard: ICard, secondCard: ICard): number => {
                              return this.compareValues(firstCard, secondCard, algorithm);
                            });
  }

  public getMinOrMax(key: string, isMin: boolean): number {
    const values: Array<number> = [];
    this.originalData.forEach((obj: ICard): number => values.push(Number(obj[key as keyof ICard])));
    
    return isMin ? Math.min(...values) : Math.max(...values);
  }

}

export default DataManager;


