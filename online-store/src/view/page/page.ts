import './page.css';
import data from '../../data';
import Card from '../card/card';

class Page {

  public createCardContainer(): void {
    const cardContainer: HTMLDivElement = document.createElement('div');
    cardContainer.classList.add('container_cards');
    data.forEach((item): void => cardContainer.append(new Card(item).createCard()));
    document.body.append(cardContainer);
  }

}



export default Page;