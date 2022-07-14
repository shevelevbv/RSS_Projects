import { ICard, IFilter } from '../helpers/interfaces';
import Basket from '../view/cart/cart';
import Page from '../view/page/page';
import DataManager from './data-manager';

type Tuple = [ICard, HTMLElement];

class Controller {
  private page: Page;
  private dataManager: DataManager;
  private cart: Basket;
  private filters: IFilter;

  constructor() {
    this.page = new Page();
    this.dataManager = new DataManager();
    this.cart = new Basket();
    this.filters = {country: [],
                    variety: [],
                  };
  }

  setLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart.getItems()));
  }

  getLocalStorage() {
    if (localStorage.getItem('cart')) {
      this.cart.setItems(JSON.parse(localStorage.getItem('cart') as string));
    }
  }

  addListenerOnCards(cards: Array<Tuple>) {
    cards.forEach((card: Tuple) => card[1].onclick = (): void => {
      if (this.cart.getItems().includes(card[0].id)) {
        this.cart.removeItem(card[0].id);
        card[1].classList.remove('in-cart');
      } else {
        this.cart.addItem(card[0].id);
        card[1].classList.add('in-cart');
      }
      this.page.drawCartLabel(this.cart.getSize());
    });
  }

  start() {

    let filteringData: Array<ICard> = this.dataManager.getOriginalData();
    this.getLocalStorage();
    this.page.drawCartLabel(this.cart.getSize());

    const countryFilterButtons: Array<HTMLButtonElement> = this.page.drawFilter('country', ['India', 'China', 'Ceylon']);
    const varietyFilterButtons: Array<HTMLButtonElement> = this.page.drawFilter('variety', ['black', 'green', 'white', 'oolong']);

    let cards: Array<Tuple> = this.page.fillCardContainer(filteringData);

    if (this.cart.getSize()) {
      cards.filter((card: Tuple): boolean => this.cart.getItems().includes(card[0].id))
           .forEach((item: Tuple): void => {item[1].classList.add('in-cart');
      })
    }

    this.addListenerOnCards(cards);
    
    countryFilterButtons.forEach((button: HTMLButtonElement) => button.onclick = (): void => {

      if (this.filters.country.includes(`${button.textContent}`)) {
        this.filters.country = this.filters.country.filter(value => value !== `${button.textContent}`);
      } else {
        this.filters.country.push(`${button.textContent}`);
      }

      filteringData = this.dataManager.filterData(this.filters);
        
      cards = this.page.fillCardContainer(filteringData);
      this.addListenerOnCards(cards);
    });

    varietyFilterButtons.forEach((button: HTMLButtonElement) => button.onclick = (): void => {

      if (this.filters.variety.includes(`${button.textContent}`)) {
        this.filters.variety = this.filters.variety.filter(value => value !== `${button.textContent}`);
      } else {
        this.filters.variety.push(`${button.textContent}`);
      }

      filteringData = this.dataManager.filterData(this.filters);
        
      cards = this.page.fillCardContainer(filteringData);
      this.addListenerOnCards(cards);
    });

    window.onunload = ():void => {
      this.setLocalStorage();
    }
  }
}

export default Controller;