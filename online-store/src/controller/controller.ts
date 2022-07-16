import { ICard, IFilter } from '../helpers/interfaces';
import Cart from '../view/cart/cart';
import Page from '../view/page/page';
import DataManager from './data-manager';
import { Limits } from '../helpers/enums';

type Tuple = [ICard, HTMLElement];

class Controller {
  private page: Page;
  private dataManager: DataManager;
  private cart: Cart;
  private filters: IFilter;
  private filteringData: Array<ICard>
  private searchInputValue: string;
  private sorter: HTMLSelectElement;
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
    this.searchInputValue = '';
    this.sorter = this.page.drawSorter();
    this.cards = this.page.fillCardContainer(this.filteringData);
  }

  public start(): void {

    this.getLocalStorage();
    this.page.drawCartLabel(this.cart.getSize());
    this.filteringData = this.dataManager.applyFiltersToData(this.filters, this.searchInputValue, this.sorter.value);
    this.cards = this.page.fillCardContainer(this.filteringData);

    const searchInput: HTMLInputElement = this.page.drawSearch();
    searchInput.value = this.searchInputValue;

    const countryFilterButtons: Array<HTMLButtonElement> = this.page.drawFilter('country', ['India', 'China', 'Ceylon']);
    const varietyFilterButtons: Array<HTMLButtonElement> = this.page.drawFilter('variety', ['Black', 'Green', 'White', 'Oolong', 'Puerh']);
    const favoriteFilterButtons: Array<HTMLButtonElement> = this.page.drawFilter('favorite', ['yes']);

    const resetButton: HTMLButtonElement = this.page.drawResetButton('Reset filters', 'resetFilters');
    const resetAllButton: HTMLButtonElement = this.page.drawResetButton('Reset all', 'resetAll');

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

    searchInput.oninput = (): void => {
      this.searchInputValue = searchInput.value;
      this.rerenderCards();
    }

    resetButton.onclick = (): void => {
      this.filters = {country: [],
                      variety: [],
                      favorite: []
                    };
      this.removeClassesFromFilters(countryFilterButtons);
      this.removeClassesFromFilters(varietyFilterButtons);
      this.removeClassesFromFilters(favoriteFilterButtons);
      this.searchInputValue = '';
      searchInput.value = '';
      this.rerenderCards();
    }

    resetAllButton.onclick = (): void => {
      this.sorter.value = 'nameAsc';
      resetButton.click();
      this.cart.setItems([]);
      this.page.drawCartLabel(this.cart.getSize());
      this.removeClassesFromCards(this.cards);
    }

    this.sorter.onchange = (): void => {
      this.rerenderCards();
    }

    window.onunload = (): void => {
      this.setLocalStorage();
    }
  }

  public setLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart.getItems()));
    localStorage.setItem('filters', JSON.stringify(this.filters));
    localStorage.setItem('search', this.searchInputValue);
    localStorage.setItem('sorter', this.sorter.value);
  }

  public getLocalStorage(): void {
    if (localStorage.getItem('cart')) {
      this.cart.setItems(JSON.parse(localStorage.getItem('cart') as string));
    }
    if (localStorage.getItem('filters')) {
      this.filters = JSON.parse(localStorage.getItem('filters') as string);
    }
    if (localStorage.getItem('search')) {
      this.searchInputValue = localStorage.getItem('search') as string;
    }
    if (localStorage.getItem('sorter')) {
      this.sorter.value = localStorage.getItem('sorter') as string;
    }
  }

  private addListenerOnCards(cards: Array<Tuple>): void {
    let extraCard: Tuple | null;
    cards.forEach((card: Tuple) => card[1].onclick = (): void => {
      if (this.cart.getItems().includes(card[0].id)) {
        this.cart.removeItem(card[0].id);
        card[1].classList.remove('in-cart');
        card[1].classList.remove('exceed-limit');
        if (extraCard) {
          extraCard[1].classList.remove('exceed-limit');
          extraCard = null;
        }
      } else {
        this.cart.addItem(card[0].id);
        if (this.cart.getSize() > Limits.maxCartItems) {
          extraCard = card;
          card[1].classList.add('exceed-limit');
          this.cart.removeItem(card[0].id);
          return;
        }
        card[1].classList.add('in-cart');
      }
      this.page.drawCartLabel(this.cart.getSize());
    });
  }

  private addClassesOnFilters(key: string, filterButtons: Array<HTMLButtonElement>): void {
    filterButtons.forEach((button: HTMLButtonElement) => {
      if (this.filters[key as keyof IFilter].includes(`${button.textContent}`)) {
        button.classList.add('selected');
      } 
    });
  }

  private removeClassesFromFilters(filterButtons: Array<HTMLButtonElement>): void {
    filterButtons.forEach((button: HTMLButtonElement) => {
      button.classList.remove('selected');
    });
  }

  private addClassesOnCards(cards: Array<Tuple>): void {
    cards.forEach((card: Tuple) => {
      if (this.cart.getItems().includes(card[0].id)) {
    
        card[1].classList.add('in-cart');
      } 
    });
  }

  private removeClassesFromCards(cards: Array<Tuple>): void {
    cards.forEach((card: Tuple) => {
        card[1].classList.remove('in-cart');
    });
  }

  private addListenerOnFilters(key: string, filterButtons: Array<HTMLButtonElement>): void {
    filterButtons.forEach((button: HTMLButtonElement) => button.onclick = (): void => {

      if (this.filters[key as keyof IFilter].includes(`${button.textContent}`)) {
        this.filters[key as keyof IFilter] = this.filters[key as keyof IFilter].filter(value => value !== `${button.textContent}`);
        button.classList.remove('selected');
      } else {
        this.filters[key as keyof IFilter].push(`${button.textContent}`);
        button.classList.add('selected');
      }
      this.rerenderCards();
      
    });
  }

  private rerenderCards(): void {
    this.filteringData = this.dataManager.applyFiltersToData(this.filters, this.searchInputValue, this.sorter.value);
    if (this.filteringData.length) {
      this.page.cardContainer.classList.remove('none');
      this.cards = this.page.fillCardContainer(this.filteringData);
      this.addListenerOnCards(this.cards);
      this.addClassesOnCards(this.cards);
    } else {
      this.page.cardContainer.innerHTML = '';
      this.page.cardContainer.classList.add('none');
    }
    
  }

}

export default Controller;