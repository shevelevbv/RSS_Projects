import './page.css';
import Card from '../card/card';
import { ICard } from '../../helpers/interfaces';

class Page {
  private cardContainer: HTMLDivElement;

  constructor() {
    this.cardContainer = document.createElement('div');
    this.cardContainer.classList.add('container_cards');
    document.body.append(this.cardContainer);
  }

  public fillCardContainer(data: Array<ICard>): void {
    data.forEach((item): void => this.cardContainer.append(new Card(item).createCard())); 
  }

  public clearCardContainer(): void {
    this.cardContainer.innerHTML = '';
  }

}



export default Page;