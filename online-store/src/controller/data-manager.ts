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

  private checkData(testValue: string, values: Array<string>): boolean {
    if (!values.length) return true;
    return values.includes(testValue);
  }

  public filterData(filters: IFilter): Array<ICard> {
    return this.originalData.filter(obj => this.checkData(obj.country, filters.country)
                                        && this.checkData(obj.variety, filters.variety)
                                        && this.checkData(obj.favorite, filters.favorite));
  }
}

export default DataManager;

