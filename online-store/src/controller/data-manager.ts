import data from '../data';
import { ICard } from '../helpers/interfaces';

class DataManager {
  private originalData: Array<ICard>;

  constructor() {
    this.originalData = data;
  }

  getOriginalData(): Array<ICard> {
    return this.originalData;
  }

  filterData(): Array<ICard> {
    return this.originalData.filter(obj => obj.id > 5);
  }

}

export default DataManager;

