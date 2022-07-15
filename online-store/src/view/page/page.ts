import './page.css';
import Card from '../card/card';
import { ICard } from '../../helpers/interfaces';

class Page {
  private header: HTMLElement;
  private main: HTMLElement;
  private cartContainer: HTMLDivElement;
  private cartLabel: HTMLDivElement;
  private filterContainer: HTMLDivElement;
  private cardContainer: HTMLDivElement;
  

  constructor() {
    this.header = document.createElement('header');
    this.main = document.createElement('main');
    this.main.className = 'main';
    this.cartContainer = document.createElement('div');
    this.cartLabel = document.createElement('p');
    this.createHeader();
    
    this.filterContainer = document.createElement('div');
    this.filterContainer.className = 'filter__container';

    this.cardContainer = document.createElement('div');
    this.cardContainer.className = 'container_cards';
    this.main.append(this.filterContainer, this.cardContainer)
    document.body.append(this.header, this.main);
  }

  private createHeader() {
    this.header.className = 'header';
    const logo: HTMLElement = document.createElement('div');
    logo.className = 'logo';
    const logoImageContainer: HTMLElement = document.createElement('div');
    logoImageContainer.className = 'logo__container_img';
    const logoImage: HTMLImageElement = document.createElement('img');
    logoImage.src = '../../img/leaf.svg';
    logoImage.width = 50;
    logoImage.height = 50;
    const logoTitle: HTMLHeadingElement = document.createElement('h1');
    logoTitle.textContent = 'Tea Shop';
    logoImageContainer.append(logoImage);
    logo.append(logoImageContainer, logoTitle);

    this.cartContainer.className = 'cart__container';
    const cartImage: HTMLImageElement = document.createElement('img');
    cartImage.src = '../../img/cart.svg';
    cartImage.width = 50;
    cartImage.height = 50;
    this.cartContainer.append(cartImage);

    this.header.append(logo, this.cartContainer);
  }

  drawCartLabel(num: number): void {
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
    const filter: HTMLDivElement = document.createElement('div');
    filter.className = 'filter';
    const filterTitle: HTMLHeadingElement = document.createElement('h3'); 
    filterTitle.className = 'filter__title';
    filterTitle.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    filter.append(filterTitle);
    const filterButtonContainer: HTMLDivElement = document.createElement('div');
    filterButtonContainer.className = "filter__button_container"
    const filterButtons: Array<HTMLButtonElement> = [];
    textValues.forEach((value: string): void => {
      const filterButton = document.createElement('button');
      filterButton.className = `button filter__button_${key}`;
      filterButton.textContent = value;
      filterButtonContainer.append(filterButton);
      filterButtons.push(filterButton);
    });
    filter.append(filterButtonContainer);
    this.filterContainer.append(filter);
    return filterButtons;
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