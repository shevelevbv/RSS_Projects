import './page.css';
import Card from '../card/card';
import { ICard } from '../../helpers/interfaces';

class Page {
  private header: HTMLElement;
  private cardContainer: HTMLDivElement;
  private cartContainer: HTMLDivElement;
  private cartLabel: HTMLDivElement;

  constructor() {
    this.header = document.createElement('header');
    this.cartContainer = document.createElement('div');
    this.cartLabel = document.createElement('p');
    this.createHeader();
    
    this.cardContainer = document.createElement('div');
    this.cardContainer.className = 'container_cards';
    document.body.append(this.header, this.cardContainer);
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

  public fillCardContainer(data: Array<ICard>): Array<[ICard, HTMLElement]> {
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