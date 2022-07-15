import { ICard, IFilter } from '../helpers/interfaces';
import Cart from '../view/cart/cart';
import Page from '../view/page/page';
import DataManager from './data-manager';

type Tuple = [ICard, HTMLElement];

class Controller {
  private page: Page;
  private dataManager: DataManager;
  private cart: Cart;
  private filters: IFilter;
  private filteringData: Array<ICard>
  private cards: Array<Tuple>;

  constructor() {
    this.page = new Page();
    this.dataManager = new DataManager();
    this.cart = new Cart();
    this.filters = {country: [],
                    variety: [],
                    favorite: []
                  };
    this.filteringData = this.dataManager.getOriginalData();
    this.cards = this.page.fillCardContainer(this.filteringData);
  }

  start() {

    this.getLocalStorage();
    this.page.drawCartLabel(this.cart.getSize());
    this.filteringData = this.dataManager.filterData(this.filters);
    this.cards = this.page.fillCardContainer(this.filteringData);

    const countryFilterButtons: Array<HTMLButtonElement> = this.page.drawFilter('country', ['India', 'China', 'Ceylon']);
    const varietyFilterButtons: Array<HTMLButtonElement> = this.page.drawFilter('variety', ['Black', 'Green', 'White', 'Oolong', 'Puerh']);
    const favoriteFilterButtons: Array<HTMLButtonElement> = this.page.drawFilter('favorite', ['yes']);

    this.addClassesOnFilters('country', countryFilterButtons);
    this.addClassesOnFilters('variety', varietyFilterButtons);
    this.addClassesOnFilters('favorite', favoriteFilterButtons);

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

  setLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart.getItems()));
    localStorage.setItem('filters', JSON.stringify(this.filters))
  }

  getLocalStorage(): void {
    if (localStorage.getItem('cart')) {
      this.cart.setItems(JSON.parse(localStorage.getItem('cart') as string));
    }
    if (localStorage.getItem('filters')) {
      this.filters = JSON.parse(localStorage.getItem('filters') as string);
    }
  }

  addListenerOnCards(cards: Array<Tuple>): void {
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

  addClassesOnFilters(key: string, filterButtons: Array<HTMLButtonElement>): void {
    filterButtons.forEach((button: HTMLButtonElement) => {
      if (this.filters[key as keyof IFilter].includes(`${button.textContent}`)) {
        button.classList.add('selected');
      } 
    });
  }

  addClassesOnCards(cards: Array<Tuple>) {
    cards.forEach((card: Tuple) => {
      if (this.cart.getItems().includes(card[0].id)) {
    
        card[1].classList.add('in-cart');
      } 
    });
  }

  addListenerOnFilters(key: string, filterButtons: Array<HTMLButtonElement>): void {
    filterButtons.forEach((button: HTMLButtonElement) => button.onclick = (): void => {

      if (this.filters[key as keyof IFilter].includes(`${button.textContent}`)) {
        this.filters[key as keyof IFilter] = this.filters[key as keyof IFilter].filter(value => value !== `${button.textContent}`);
        button.classList.remove('selected');
      } else {
        this.filters[key as keyof IFilter].push(`${button.textContent}`);
        button.classList.add('selected');
      }

      this.filteringData = this.dataManager.filterData(this.filters);
        
      this.cards = this.page.fillCardContainer(this.filteringData);
      this.addListenerOnCards(this.cards);
      this.addClassesOnCards(this.cards);
    });
  }

}

export default Controller;