import { createElement } from '../../helpers/functions';

class Header {

  private header: HTMLElement;
  private cartContainer: HTMLDivElement;
  private cartLabel: HTMLDivElement;
  
  constructor() {
    this.header = createElement(document.body, 'header', 'header');
    this.cartContainer = createElement(null, 'div', 'cart__container');
    this.cartLabel = document.createElement('p');

    this.createHeader();
  }

  private createHeader(): void {
    const logo: HTMLDivElement = createElement(this.header, 'div', 'logo');
    const logoImageContainer: HTMLDivElement = createElement(logo, 'div', 'logo__container_img');
    const logoImage: HTMLImageElement = createElement(logoImageContainer, 'img', 'logo__image');
    logoImage.src = '../../img/leaf.svg';
    logoImage.width = 50;
    logoImage.height = 50;
    createElement(logo, 'h1', 'logo__title', 'Tea Shop');

    this.header.append(this.cartContainer);
    
    const cartImage: HTMLImageElement = createElement(this.cartContainer, 'img', 'cart__logo');
    cartImage.src = '../../img/cart.svg';
    cartImage.width = 40;
    cartImage.height = 40;
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
}

export default Header;