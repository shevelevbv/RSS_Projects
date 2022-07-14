import './card.css';
import { ICard } from "../../helpers/interfaces";

class Card {
  private data: ICard;

  constructor(data: ICard) {
    this.data = data;
  }

  public createCard(): HTMLDivElement {
    const newCard: HTMLDivElement = document.createElement('div');
    newCard.classList.add('card');
    const cardTitle: HTMLHeadingElement = document.createElement('h2');
    cardTitle.className = 'card__title';
    cardTitle.textContent = this.data.title;
    const cardImageContainer: HTMLDivElement = document.createElement('div');
    cardImageContainer.className = 'card__container_img';
    const cardImage: HTMLImageElement = document.createElement('img');
    cardImage.className = 'card__image';
    cardImage.src = this.data.img;
    cardImage.width = 200;
    cardImage.height = 200;
    cardImageContainer.append(cardImage);
    const cardList: HTMLUListElement = document.createElement('ul');
    cardList.className = 'card__list';
    const cardCountry: HTMLLIElement = document.createElement('li');
    cardCountry.className = 'card__list_item';
    cardCountry.textContent = `Country: ${this.data.country}`;
    const cardYear: HTMLLIElement = document.createElement('li');
    cardYear.className = 'card__list_item';
    cardYear.textContent = `Year: ${this.data.year}`;
    const cardVariety: HTMLLIElement = document.createElement('li');
    cardVariety.className = 'card__list_item';
    cardVariety.textContent = `Variety: ${this.data.variety}`;
    const cardStock: HTMLLIElement = document.createElement('li');
    cardStock.className = 'card__list_item';
    cardStock.textContent = `In stock: ${this.data.stock}`;
    const cardFavorite: HTMLLIElement = document.createElement('li');
    cardFavorite.className = 'card__list_item';
    cardFavorite.textContent = `Favorite: ${this.data.favorite ? 'yes' : 'no'}`;
    const cardPrice: HTMLLIElement = document.createElement('li');
    cardPrice.className = 'card__list_item';
    cardPrice.textContent = `Price (100g): $${this.data.price}`;

    cardList.append(cardCountry, cardYear, cardVariety, cardStock, cardFavorite, cardPrice);
    newCard.append(cardTitle, cardImageContainer, cardList);
    return newCard;
  }

  getData(): ICard {
    return this.data;
  }
}

export default Card;