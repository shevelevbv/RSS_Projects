import './page.css';
import Card from '../card/card';
import { ICard } from '../../helpers/interfaces';
import { createElement } from '../../helpers/functions';

class Page {
  private header: HTMLElement;
  private main: HTMLElement;
  private cartContainer: HTMLDivElement;
  private cartLabel: HTMLDivElement;
  private filterContainer: HTMLDivElement;
  private filterElements: HTMLDivElement;
  private resetButtonContainer: HTMLDivElement;
  private cardContainer: HTMLDivElement;
  
  constructor() {
    this.header = createElement(document.body, 'header', 'header');
    this.main = createElement(document.body, 'main', 'main');
    this.cartContainer = createElement(null, 'div', 'cart__container');
    this.cartLabel = document.createElement('p');

    this.createHeader();
    
    this.filterContainer = createElement(this.main, 'div', 'filter__container')
    this.filterElements = createElement(this.filterContainer, 'div', 'filter__elements');
    this.resetButtonContainer = createElement(this.filterContainer, 'div', 'filter__buttons_reset');
    this.cardContainer = createElement(this.main, 'div', 'container_cards');
  }

  private createHeader(): void {
    const logo: HTMLDivElement = createElement(this.header, 'div', 'logo');
    const logoImageContainer: HTMLDivElement = createElement(logo, 'div', 'logo__container_img');
    const logoImage: HTMLImageElement = createElement(logoImageContainer, 'img', 'logo__image');
    logoImage.src = '../../img/leaf.svg';
    logoImage.width = 50;
    logoImage.height = 50;
    createElement(logo, 'h1', '', 'Tea Shop');

    this.header.append(this.cartContainer);
    
    const cartImage: HTMLImageElement = createElement(this.cartContainer, 'img');
    cartImage.src = '../../img/cart.svg';
    cartImage.width = 50;
    cartImage.height = 50;
  }

  public drawCartLabel(num: number): void {
    this.cartLabel.className = 'cart__label';
    if (!num) {
      this.cartLabel.classList.remove('visible');
    } else {
      this.cartLabel.classList.add('visible');
      this.cartLabel.textContent = `${num}`;
    }
    this.cartContainer.append(this.cartLabel);
  }

  public drawFilter(key: string, textValues: Array<string>): Array<HTMLButtonElement> {
    const filter: HTMLDivElement = createElement(this.filterElements, 'div', 'filter');
    createElement(filter, 'h2', 'filter__title', key.charAt(0).toUpperCase() + key.slice(1));
    const filterButtonContainer: HTMLDivElement = createElement(filter, 'div', 'filter__button_container');
    const filterButtons: Array<HTMLButtonElement> = [];
    textValues.forEach((value: string): void => {
      const filterButton: HTMLButtonElement = createElement(filterButtonContainer, 'button', `button filter__button_${key}`, value);
      filterButtons.push(filterButton);
    });
    return filterButtons;
  }

  public drawResetButton(content: string, value: string): HTMLButtonElement {
    const button: HTMLButtonElement = createElement(this.resetButtonContainer, 'button', `filter__button_reset filter__button_${value}`, content);
    return button;
  }

  public drawSearch(value = ''): HTMLInputElement {
    const searchContainer: HTMLDivElement = createElement(this.filterElements, 'div', 'filter__container_search');
    const searchInput: HTMLInputElement = createElement(searchContainer, 'input', 'filter__input_search');
    searchInput.type = 'text';
    searchInput.value = value;
    searchInput.autofocus = true;
    return searchInput;
  }

  public fillCardContainer(data: Array<ICard>): Array<[ICard, HTMLElement]> {
    this.cardContainer.innerHTML = '';
    const cards: Array<[ICard, HTMLElement]> = []; 
    data.forEach((item: ICard): void => {
      const card: HTMLDivElement = new Card(item).createCard();
      this.cardContainer.append(card);
      cards.push([item, card]);
    });
    return cards;  
  }

  public clearCardContainer(): void {
    this.cardContainer.innerHTML = '';
  }

}



export default Page;