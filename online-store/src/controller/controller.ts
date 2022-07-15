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
  private filteringData: Array<ICard>
  private cards: Array<Tuple>;

  constructor() {
    this.page = new Page();
    this.dataManager = new DataManager();
    this.cart = new Basket();
    this.filters = {country: [],
                    variety: [],
                    favorite: []
                  };
    this.filteringData = this.dataManager.getOriginalData();
    this.cards = this.page.fillCardContainer(this.filteringData);
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

  addListenerOnFilters(key: string, filterButtons: Array<HTMLButtonElement>) {
    filterButtons.forEach((button: HTMLButtonElement) => button.onclick = (): void => {

      if (this.filters[key as keyof IFilter].includes(`${button.textContent}`)) {
        this.filters[key as keyof IFilter] = this.filters[key as keyof IFilter].filter(value => value !== `${button.textContent}`);
      } else {
        this.filters[key as keyof IFilter].push(`${button.textContent}`);
      }

      this.filteringData = this.dataManager.filterData(this.filters);
        
      this.cards = this.page.fillCardContainer(this.filteringData);
      this.addListenerOnCards(this.cards);
    });
  }

  start() {

    this.getLocalStorage();
    this.page.drawCartLabel(this.cart.getSize());

    const countryFilterButtons: Array<HTMLButtonElement> = this.page.drawFilter('country', ['India', 'China', 'Ceylon']);
    const varietyFilterButtons: Array<HTMLButtonElement> = this.page.drawFilter('variety', ['black', 'green', 'white', 'oolong', 'puerh']);
    const favoriteFilterButtons: Array<HTMLButtonElement> = this.page.drawFilter('favorite', ['yes']);

    if (this.cart.getSize()) {
      this.cards.filter((card: Tuple): boolean => this.cart.getItems().includes(card[0].id))
           .forEach((item: Tuple): void => {item[1].classList.add('in-cart');
      })
    }

    this.addListenerOnCards(this.cards);
    
    this.addListenerOnFilters('country', countryFilterButtons);

    this.addListenerOnFilters('variety', varietyFilterButtons);

    this.addListenerOnFilters('favorite', favoriteFilterButtons);

    window.onunload = ():void => {
      this.setLocalStorage();
    }
  }
}

export default Controller;