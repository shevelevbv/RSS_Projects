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
    this.page.drawCartLabel(this.cart.getSize());
    this.filteringData = this.dataManager.applyFiltersToData(this.filters, this.searchInputValue, this.sorter.value);
    this.cards = this.page.fillCardContainer(this.filteringData);

    const searchInput: HTMLInputElement = this.page.drawSearch();
    searchInput.value = this.searchInputValue;

    const countryFilterButtons: Array<HTMLButtonElement> = this.page.drawFilter('country', ['India', 'China', 'Ceylon']);
    const varietyFilterButtons: Array<HTMLButtonElement> = this.page.drawFilter('variety', ['Black', 'Green', 'White', 'Oolong', 'Puerh']);
    const seasonFilterButtons: Array<HTMLButtonElement> = this.page.drawFilter('season', ['Spring', 'Summer', 'Fall', 'Winter']);
    const [priceInput1, priceInput2, priceValue1, priceValue2, priceTrack]: [HTMLInputElement, HTMLInputElement, HTMLSpanElement, HTMLSpanElement, HTMLDivElement] = 
      this.page.drawRangeInput('Price', this.dataManager.getMinOrMax('price', true), this.dataManager.getMinOrMax('price', false));
    const [stockInput1, stockInput2, stockValue1, stockValue2, stockTrack]: [HTMLInputElement, HTMLInputElement, HTMLSpanElement, HTMLSpanElement, HTMLDivElement] = 
      this.page.drawRangeInput('In stock', this.dataManager.getMinOrMax('stock', true), this.dataManager.getMinOrMax('stock', false));
    const favoriteFilterButtons: Array<HTMLButtonElement> = this.page.drawFilter('favorite', ['yes']);

    const resetButton: HTMLButtonElement = this.page.drawResetButton('Reset filters', 'resetFilters');
    const resetAllButton: HTMLButtonElement = this.page.drawResetButton('Reset all', 'resetAll');

    this.addClassesOnFilters('country', countryFilterButtons);
    this.addClassesOnFilters('variety', varietyFilterButtons);
    this.addClassesOnFilters('season', seasonFilterButtons);
    this.addClassesOnFilters('favorite', favoriteFilterButtons);

    if (this.cart.getSize()) {
      this.cards.filter((card: Tuple): boolean => this.cart.getItems().includes(card[0].id))
           .forEach((item: Tuple): void => {item[1].classList.add('in-cart');
      })
    }

    this.addListenerOnCards(this.cards);
    
    this.addListenerOnFilters('country', countryFilterButtons);
    this.addListenerOnFilters('variety', varietyFilterButtons);
    this.addListenerOnFilters('season', seasonFilterButtons);
    this.addListenerOnFilters('favorite', favoriteFilterButtons);

    searchInput.oninput = (): void => {
      this.searchInputValue = searchInput.value;
      this.rerenderCards();
    }

    priceInput1.oninput = (): void => {
      if (parseInt(priceInput2.value) - parseInt(priceInput1.value) <= Limits.minInputFilterGap) {
        priceInput1.value = String(parseInt(priceInput2.value) - Limits.minInputFilterGap);
      }
      priceValue1.textContent = priceInput1.value;
      this.fillColor(priceInput1, priceInput2, priceTrack);
    }

    priceInput2.oninput = (): void => {
      if (parseInt(priceInput2.value) - parseInt(priceInput1.value) <= Limits.minInputFilterGap) {
        priceInput2.value = String(parseInt(priceInput1.value) + Limits.minInputFilterGap);
      }
      priceValue2.textContent = priceInput2.value;
      this.fillColor(priceInput1, priceInput2, priceTrack);
    }

    priceInput1.onmouseup = () => {
      this.filters.priceRange = [priceInput1.value, priceInput2.value];
      this.rerenderCards();
    }

    priceInput2.onmouseup = () => {
      this.filters.priceRange = [priceInput1.value, priceInput2.value];
      this.rerenderCards();
    }

    stockInput1.oninput = (): void => {
      if (parseInt(stockInput2.value) - parseInt(stockInput1.value) <= Limits.minInputFilterGap) {
        stockInput1.value = String(parseInt(stockInput2.value) - Limits.minInputFilterGap);
      }
      stockValue1.textContent = stockInput1.value;
      this.fillColor(stockInput1, stockInput2, stockTrack);
    }

    stockInput2.oninput = (): void => {
      if (parseInt(stockInput2.value) - parseInt(stockInput1.value) <= Limits.minInputFilterGap) {
        stockInput2.value = String(parseInt(stockInput1.value) + Limits.minInputFilterGap);
      }
      stockValue2.textContent = stockInput2.value;
      this.fillColor(stockInput1, stockInput2, stockTrack);
    }

    stockInput1.onmouseup = () => {
      this.filters.stockRange = [stockInput1.value, stockInput2.value];
      this.rerenderCards();
    }

    stockInput2.onmouseup = () => {
      this.filters.stockRange = [stockInput1.value, stockInput2.value];
      this.rerenderCards();
    }

    priceTrack.onclick = (event) => {
      let eventPosition = Math.round(event.offsetX / priceTrack.offsetWidth * (parseInt(priceInput1.max) - parseInt(priceInput1.min)));
      eventPosition = Math.ceil(eventPosition * 1.1);
      if (Math.abs(eventPosition - parseInt(priceInput1.value)) < Math.abs(eventPosition - parseInt(priceInput2.value))) {
        priceInput1.value = String(eventPosition);
        priceValue1.textContent = String(eventPosition);
      } else {
        priceInput2.value = String(eventPosition);
        priceValue2.textContent = String(eventPosition);
      }
      this.fillColor(priceInput1, priceInput2, priceTrack);
      this.filters.priceRange = [priceInput1.value, priceInput2.value];
      this.rerenderCards();
    }

    stockTrack.onclick = (event) => {
      let eventPosition = Math.round(event.offsetX / stockTrack.offsetWidth * (parseInt(stockInput1.max) - parseInt(stockInput1.min)));
      eventPosition = Math.ceil(eventPosition * 1.1);
      if (Math.abs(eventPosition - parseInt(stockInput1.value)) < Math.abs(eventPosition - parseInt(stockInput2.value))) {
        stockInput1.value = String(eventPosition);
        stockValue1.textContent = String(eventPosition);
      } else {
        stockInput2.value = String(eventPosition);
        stockValue2.textContent = String(eventPosition);
      }
      this.fillColor(stockInput1, stockInput2, stockTrack);
      this.filters.stockRange = [stockInput1.value, stockInput2.value];
      this.rerenderCards();
    }

    resetButton.onclick = (): void => {
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
      this.rerenderCards();
    }

    resetAllButton.onclick = (): void => {
      this.sorter.value = 'nameAsc';
      resetButton.click();
      this.cart.setItems([]);
      this.page.drawCartLabel(this.cart.getSize());
      this.removeClassesFromCards(this.cards);
      localStorage.clear();
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

  private fillColor(slider1: HTMLInputElement, slider2: HTMLInputElement, track: HTMLDivElement): void {
    const percent1: number = (parseInt(slider1.value) / parseInt(slider1.max)) * 100;
    const percent2: number = (parseInt(slider2.value) / parseInt(slider1.max)) * 100;
    track.style.background = `linear-gradient(to right, #dadae5 ${percent1 - 2}% , #5fd65f ${percent1 - 2}% , #5fd65f ${percent2 - 2}%, #dadae5 ${percent2 - 2}%)`;
  }

}

export default Controller;