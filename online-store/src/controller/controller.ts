import Page from "../view/page/page";
import DataManager from "./data-manager";

class Controller {
  private page: Page;
  private dataManager: DataManager;

  constructor() {
    this.page = new Page();
    this.dataManager = new DataManager();
  }

  start() {
    this.page.fillCardContainer(this.dataManager.getOriginalData());
  }
}

export default Controller;