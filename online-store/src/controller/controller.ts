import { ICard, IFilter } from '../helpers/interfaces';
import Cart from '../view/cart/cart';
import Range from './range';
import Page from '../view/page/page';
import DataManager from './data-manager';
import { Limits } from '../helpers/enums';

type numAndHTMLTuple = [number, HTMLElement];

class Controller {
  private page: Page;
  private dataManager: DataManager;
  private cart: Cart;
  public filters: IFilter;
  private filteringData: Array<ICard>
  private searchInputValue: string;
  private sorter: HTMLSelectElement;
  private cards: Array<numAndHTMLTuple>;

  constructor() {
    this.page = new Page();
    this.dataManager = new DataManager();
    this.cart = new Cart();
    this.filters = {country: [],
                    variety: [],
                    season: [],
                    priceRange: [],
                    stockRange: [],
                    favorite: []
                  };
    this.filteringData = this.dataManager.getOriginalData();
    this.searchInputValue = '';
    this.sorter = this.page.drawSorter();
    this.cards = this.page.fillCardContainer(this.filteringData);
  }

  public start(): void {

    this.getLocalStorage();
    this.page.header.drawCartLabel(this.cart.getSize());

    const [searchInput, searchCancel]: [HTMLInputElement, HTMLButtonElement] = this.page.drawSearch();
    searchInput.value = this.searchInputValue;

    const countryFilterButtons: Array<HTMLButtonElement> = this.page.drawFilter('country', ['India', 'China', 'Ceylon']);
    const varietyFilterButtons: Array<HTMLButtonElement> = this.page.drawFilter('variety', ['Black', 'Green', 'White', 'Oolong', 'Puerh']);
    const seasonFilterButtons: Array<HTMLButtonElement> = this.page.drawFilter('season', ['Spring', 'Summer', 'Fall', 'Winter']);

    const priceRange: Range = new Range('Price',
                                String(this.dataManager.getMinOrMax('price', true)), 
                                String(this.dataManager.getMinOrMax('price', false)),
                                this.page);
                      
    const stockRange: Range = new Range('In stock',
                                String(this.dataManager.getMinOrMax('stock', true)), 
                                String(this.dataManager.getMinOrMax('stock', false)),
                                this.page);

    priceRange.reset(this.filters, 'priceRange');
    stockRange.reset(this.filters, 'stockRange');

    this.filteringData = this.dataManager.applyFiltersToData(this.filters, this.searchInputValue, this.sorter.value);
    this.cards = this.page.fillCardContainer(this.filteringData);

    const favoriteFilterButtons: Array<HTMLButtonElement> = this.page.drawFilter('favorite', ['yes']);

    const resetButton: HTMLButtonElement = this.page.drawResetButton('Reset filters', 'resetFilters');
    const resetAllButton: HTMLButtonElement = this.page.drawResetButton('Reset all', 'resetAll');

    this.addClassesOnFilters('country', countryFilterButtons);
    this.addClassesOnFilters('variety', varietyFilterButtons);
    this.addClassesOnFilters('season', seasonFilterButtons);
    this.addClassesOnFilters('favorite', favoriteFilterButtons);

    if (this.cart.getSize()) {
      this.cards.filter((card: numAndHTMLTuple): boolean => this.cart.getItems().includes(card[0]))
           .forEach((item: numAndHTMLTuple): void => {item[1].classList.add('in-cart');
      });
    }

    this.addListenerOnCards(this.cards);
    
    this.addListenerOnFilters('country', countryFilterButtons);
    this.addListenerOnFilters('variety', varietyFilterButtons);
    this.addListenerOnFilters('season', seasonFilterButtons);
    this.addListenerOnFilters('favorite', favoriteFilterButtons);

    searchInput.addEventListener('input', (): void => {
      this.searchInputValue = searchInput.value;
      searchInput.value ? searchCancel.classList.add('visible')
                        : searchCancel.classList.remove('visible');
      this.rerenderCards();
    });

    searchCancel.addEventListener('input', (): void => {
      searchCancel.classList.remove('visible');
      searchInput.value = '';
      searchInput.focus();
      this.searchInputValue = '';
      this.rerenderCards();
    });

    this.addEventListenersOnInputs(priceRange, 'priceRange');
    this.addEventListenersOnInputs(stockRange, 'stockRange');

    resetButton.addEventListener('click', (): void => {
      this.filters = {country: [],
                      variety: [],
                      season: [],
                      priceRange: [],
                      stockRange: [],
                      favorite: []
                    };
      this.removeClassesFromFilters(countryFilterButtons);
      this.removeClassesFromFilters(varietyFilterButtons);
      this.removeClassesFromFilters(seasonFilterButtons);
      this.removeClassesFromFilters(favoriteFilterButtons);
      this.searchInputValue = '';
      searchInput.value = '';

      priceRange.reset(this.filters, 'priceRange');
      stockRange.reset(this.filters, 'stockRange');
      
      this.rerenderCards();
    });

    resetAllButton.addEventListener('click', (): void => {
      this.sorter.value = 'nameAsc';
      resetButton.click();
      this.cart.setItems([]);
      this.page.header.drawCartLabel(this.cart.getSize());
      this.removeClassesFromCards(this.cards);
      localStorage.clear();
    });

    this.sorter.addEventListener('change', (): void => {
      this.rerenderCards();
    });

    window.addEventListener('load', (): void => {
      if (!this.filteringData.length) this.page.cardContainer.classList.add('none');
      searchInput.focus();
    });

    window.addEventListener('unload', (): void => {
      this.setLocalStorage();
    });

  }

  private addEventListenersOnInputs(inputRangeObject: Range, key: string) {
    inputRangeObject.leftInput.addEventListener('input', (): void => inputRangeObject.onLeftInput());

    inputRangeObject.rightInput.addEventListener('input', (): void => inputRangeObject.onRightInput());

    inputRangeObject.leftInput.addEventListener('mouseup', (): void => {
      inputRangeObject.onMouseup1(this.filters, key);
      this.rerenderCards();
    });

    inputRangeObject.rightInput.addEventListener('mouseup', (): void => {
      inputRangeObject.onMouseup2(this.filters, key);
      this.rerenderCards();
    });

    inputRangeObject.track.addEventListener('click', (event: MouseEvent): void => {
      inputRangeObject.clickOnTrack(event, this.filters, key);
      this.rerenderCards();
    });
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

  public setLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart.getItems()));
    localStorage.setItem('filters', JSON.stringify(this.filters));
    localStorage.setItem('search', this.searchInputValue);
    localStorage.setItem('sorter', this.sorter.value);
  }

  private addListenerOnCards(cards: Array<numAndHTMLTuple>): void {
    let extraCard: numAndHTMLTuple | null;

    cards.forEach(([cardID, cardHTMLObject]: numAndHTMLTuple) => cardHTMLObject.addEventListener('click', (): void => {
      if (this.cart.getItems().includes(cardID)) {
        this.cart.removeItem(cardID);
        cardHTMLObject.classList.remove('in-cart');
        cardHTMLObject.classList.remove('exceed-limit');
        if (extraCard) {
          const extraCardHTMLObject = extraCard[1];
          extraCardHTMLObject.classList.remove('exceed-limit');
          extraCard = null;
        }
      } else {
        this.cart.addItem(cardID);
        if (this.cart.getSize() > Limits.maxCartItems) {
          extraCard = [cardID, cardHTMLObject];
          cardHTMLObject.classList.add('exceed-limit');
          this.cart.removeItem(cardID);
          return;
        }
        cardHTMLObject.classList.add('in-cart');
      }
      this.page.header.drawCartLabel(this.cart.getSize());
    }));
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

  private addClassesOnCards(cards: Array<numAndHTMLTuple>): void {
    cards.forEach(([cardID, cardHTMLObject]: numAndHTMLTuple): void => {
      if (this.cart.getItems().includes(cardID)) {
    
        cardHTMLObject.classList.add('in-cart');
      } 
    });
  }

  private removeClassesFromCards(cards: Array<numAndHTMLTuple>): void {
    cards.forEach((card: numAndHTMLTuple) => {
        const cardHTMLObject = card[1];
        cardHTMLObject.classList.remove('in-cart');
    });
  }

  private addListenerOnFilters(key: string, filterButtons: Array<HTMLButtonElement>): void {
    filterButtons.forEach((button: HTMLButtonElement) => button.addEventListener('click', (): void => {

      if (this.filters[key as keyof IFilter].includes(`${button.textContent}`)) {
        const filteredValues = this.filters[key as keyof IFilter].filter((value: string): boolean => {
          return value !== `${button.textContent}`;
        });
        this.filters[key as keyof IFilter] = filteredValues;
      } else {
        this.filters[key as keyof IFilter].push(`${button.textContent}`);
      }
      button.classList.toggle('selected');
      this.rerenderCards();  
    }));
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