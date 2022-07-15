import data from '../data';
import { ICard, IFilter } from '../helpers/interfaces';

class DataManager {
  private originalData: Array<ICard>;

  constructor() {
    this.originalData = data;
    
  }

  public getOriginalData(): Array<ICard> {
    return this.originalData;
  }

  private checkData(key: string, testValue: string, values: Array<string | boolean | number>): boolean {
    if (!values.length) return true;
    return values.includes(testValue);
  }

  public filterData(filters: IFilter) {
    return this.originalData.filter(obj => this.checkData('country', obj.country, filters.country)
                                            && this.checkData('variety', obj.variety, filters.variety)
                                            && this.checkData('favorite', obj.favorite, filters.favorite));
  }
}

export default DataManager;

