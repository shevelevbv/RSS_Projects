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
    if (!values.length) return true;
    return values.includes(testValue);
  }

  public isStringInData(testString: string, title: string): boolean {
    if (!testString) return true;
    return title.toLowerCase().includes(testString.toLowerCase());
  }

  public isInRange(testValue: number, range: Array<string>): boolean {
    return testValue >= parseInt(range[0]) && testValue <= parseInt(range[1]);
  }

  public applyFiltersToData(filters: IFilter, testString: string, algorithm: string): Array<ICard> {
    return this.originalData.filter(obj => this.isItemInData(obj.country, filters.country)
                                        && this.isItemInData(obj.variety, filters.variety)
                                        && this.isItemInData(obj.season, filters.season)
                                        && this.isInRange(obj.price, filters.priceRange)
                                        && this.isInRange(obj.stock, filters.stockRange)
                                        && this.isItemInData(obj.favorite, filters.favorite)
                                        && this.isStringInData(testString, obj.title)
                                    )
                            .sort((a: ICard, b: ICard): number => {
                              switch (algorithm) {
                                case 'nameAsc': return a.title.localeCompare(b.title);
                                case 'nameDesc': return b.title.localeCompare(a.title);
                                case 'yearAsc': return a.year - b.year;
                                case 'yearDesc': return b.year - a.year;
                                case 'priceAsc': return a.price - b.price;
                                case 'priceDesc': return b.price - a.price;
                                default: return 0;
                              }
                            });
  }

  public getMinOrMax(key: string, isMin: boolean): number {
    const values: Array<number> = [];
    this.originalData.forEach(obj => values.push(obj[key as keyof ICard] as number));
    
    return isMin ? Math.min(...values) : Math.max(...values);
  }

}

export default DataManager;


