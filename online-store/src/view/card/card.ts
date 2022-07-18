import './card.css';
import { ICard } from '../../helpers/interfaces';
import { createElement } from '../../helpers/functions';

class Card {
  private data: ICard;

  constructor(data: ICard) {
    this.data = data;
  }

  public createCard(): HTMLDivElement {

    const newCard: HTMLDivElement = createElement(null, 'div', 'card');
    
    createElement(newCard, 'h2', 'card__title', this.data.title);
    const cardImageContainer: HTMLDivElement = createElement(newCard, 'div', 'card__container_img');
    
    const cardImage: HTMLImageElement = createElement(cardImageContainer, 'img', 'card__image');
    cardImage.src = this.data.img;
    cardImage.width = 200;
    cardImage.height = 200;

    const cardList: HTMLUListElement = createElement(newCard, 'ul', 'card__list');
    createElement(cardList, 'li', 'card__list_item', `Season: ${this.data.season} ${this.data.year}`);
    createElement(cardList, 'li', 'card__list_item', `In stock: ${this.data.stock}`);
    createElement(cardList, 'li', 'card__list_item', `Price (100g): $${this.data.price}`);
    
    return newCard;
  }

}

export default Card;