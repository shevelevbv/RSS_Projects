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

  private isItemInData(testValue: string, values: Array<string>): boolean {
    if (!values.length) return true;
    return values.includes(testValue);
  }

  private isStringInData(testString: string, title: string): boolean {
    if (!testString) return true;
    return title.toLowerCase().includes(testString.toLowerCase());
  }

  public applyFiltersToData(filters: IFilter, testString: string): Array<ICard> {
    return this.originalData.filter(obj => this.isItemInData(obj.country, filters.country)
                                        && this.isItemInData(obj.variety, filters.variety)
                                        && this.isItemInData(obj.favorite, filters.favorite)
                                        && this.isStringInData(testString, obj.title)
                                    );
  }

}

export default DataManager;

