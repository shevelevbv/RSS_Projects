import './page.css';
import Card from '../card/card';
import { ICard } from '../../helpers/interfaces';
import { createElement } from '../../helpers/functions';
import Footer from '../footer/footer';
import Header from '../header/header';

class Page {
  public header: Header;
  private main: HTMLElement;
  private filterContainer: HTMLDivElement;
  private filterElements: HTMLDivElement;
  private resetButtonContainer: HTMLDivElement;
  private sectionContent: HTMLDivElement;
  public cardContainer: HTMLDivElement;
  
  constructor() {
    this.header = new Header();

    this.main = createElement(document.body, 'main', 'main');
    this.filterContainer = createElement(this.main, 'div', 'filter__container')
    this.filterElements = createElement(this.filterContainer, 'div', 'filter__elements');
    this.resetButtonContainer = createElement(this.filterContainer, 'div', 'filter__buttons_reset');
    this.sectionContent = createElement(this.main, 'section', 'section_content');
    this.cardContainer = createElement(this.sectionContent, 'div', 'container_cards');

    new Footer();
  }

  public drawFilter(key: string, textValues: Array<string>): Array<HTMLButtonElement> {
    const filter: HTMLDivElement = createElement(this.filterElements, 'div', `filter filter_${key}`);
    createElement(filter, 'h2', 'filter__title', key.charAt(0).toUpperCase() + key.slice(1));
    const filterButtonContainer: HTMLDivElement = createElement(filter, 'div', 'filter__button_container');
    const filterButtons: Array<HTMLButtonElement> = [];
    textValues.forEach((value: string): void => {
      const filterButton: HTMLButtonElement = createElement(filterButtonContainer, 'button', `button filter__button_${key}`, value);
      filterButtons.push(filterButton);
    });
    return filterButtons;
  }

  public drawRangeInput(title: string, min: number, max: number): [HTMLInputElement, HTMLInputElement, HTMLSpanElement, HTMLSpanElement, HTMLDivElement] {
    const inputRangeContainer: HTMLDivElement = createElement(this.filterElements, 'div', 'filter__range_container');
    createElement(inputRangeContainer, 'h2', 'filter__title filter__input_title', title);
    const inputContainer: HTMLDivElement = createElement(inputRangeContainer, 'div', 'filter__input_container');
    const inputTrack: HTMLDivElement = createElement(inputContainer, 'div', 'filter__input_track');
    const valuesContainer: HTMLDivElement = createElement(inputContainer, 'div', 'filter__input_values');
    const input1: HTMLInputElement = createElement(inputContainer, 'input', 'filter__input filter__input1');
    input1.min = String(min);
    input1.max = String(max);
    input1.type = 'range';
    input1.value = String(min);
    const input2: HTMLInputElement = createElement(inputContainer, 'input', 'filter__input filter__input2');
    input2.min = String(min);
    input2.max = String(max);
    input2.type = 'range';
    input2.value = String(max);
    createElement(valuesContainer, 'span', 'filter__input_text', 'from');
    const value1: HTMLSpanElement = createElement(valuesContainer, 'span', 'filter__input_value filter__input_value1');
    value1.textContent = input1.value;
    createElement(valuesContainer, 'span', 'filter__input_text', 'to');
    const value2: HTMLSpanElement = createElement(valuesContainer, 'span', 'filter__input_value filter__input_value1');
    value2.textContent = input2.value;


    return [input1, input2, value1, value2, inputTrack];

  }

  public drawResetButton(content: string, value: string): HTMLButtonElement {
    const button: HTMLButtonElement = createElement(this.resetButtonContainer, 'button', `filter__button_reset filter__button_${value}`, content);
    return button;
  }

  public drawSearch(value = ''): [HTMLInputElement, HTMLButtonElement] {
    const searchContainer: HTMLDivElement = createElement(this.filterElements, 'div', 'filter__container_search');
    const searchCancel: HTMLButtonElement = createElement(searchContainer, 'button', 'filter__button_search', 'x');
    const searchInput: HTMLInputElement = createElement(searchContainer, 'input', 'filter__input_search');
    searchInput.type = 'text';
    searchInput.value = value;
    searchInput.autofocus = true;
    searchInput.placeholder = 'Search';
    return [searchInput, searchCancel] ;
  }

  public drawSorter() {
    const sorterContainer: HTMLDivElement = createElement(null, 'div', 'sorter');
    this.sectionContent.insertBefore(sorterContainer, this.cardContainer);
    const sorterLabel: HTMLLabelElement = createElement(sorterContainer, 'label', 'sorter__label', 'Sort by');
    sorterLabel.htmlFor = 'sorter';
    const sorter: HTMLSelectElement = createElement(sorterContainer, 'select', 'sorter__select');
    sorter.id = 'sorter';
    const option1: HTMLOptionElement = createElement(sorter, 'option', 'sorter__option', 'name A-Z');
    option1.value = 'nameAsc';
    const option2: HTMLOptionElement = createElement(sorter, 'option', 'sorter__option', 'name Z-A');
    option2.value = 'nameDesc';
    const option3: HTMLOptionElement = createElement(sorter, 'option', 'sorter__option', 'year: earliest first');
    option3.value = 'yearAsc';
    const option4: HTMLOptionElement = createElement(sorter, 'option', 'sorter__option', 'year: latest first');
    option4.value = 'yearDesc';
    const option5: HTMLOptionElement = createElement(sorter, 'option', 'sorter__option', 'price: lowest first');
    option5.value = 'priceAsc';
    const option6: HTMLOptionElement = createElement(sorter, 'option', 'sorter__option', 'price: greatest first');
    option6.value = 'priceDesc';

    return sorter;
      
  }

  public fillCardContainer(data: Array<ICard>): Array<[number, HTMLElement]> {
    this.cardContainer.innerHTML = '';
    const cards: Array<[number, HTMLElement]> = []; 
    data.forEach((item: ICard): void => {
      const card: HTMLDivElement = new Card(item).createCard();
      this.cardContainer.append(card);
      cards.push([item.id, card]);
    });
    return cards;  
  }

}

export default Page;