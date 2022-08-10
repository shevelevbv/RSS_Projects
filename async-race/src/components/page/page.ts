import './page.scss';
import createElement from '../../helpers/functions';

class Page {
  public toGarageButton: HTMLButtonElement;

  public toWinnersButton: HTMLButtonElement;

  public main: HTMLDivElement;

  constructor() {
    this.toGarageButton = createElement(null, 'button', 'button header__button', 'TO GARAGE');
    this.toWinnersButton = createElement(null, 'button', 'button header__button', 'TO WINNERS');
    this.main = createElement(null, 'main', 'main');
  }

  public renderHeader = (): void => {
    const header = createElement(document.body, 'header', 'header');
    createElement(header, 'h1', 'title title__main', 'Async Race');
    const viewButtonContainer: HTMLDivElement = createElement(header, 'div', 'view__button_container');
    viewButtonContainer.append(this.toGarageButton, this.toWinnersButton);
    this.toGarageButton.disabled = true;
  };

  public renderMain = (): void => {
    document.body.append(this.main);
  };

  public resetMain = (): void => {
    this.main.innerHTML = '';
  };
}

export default Page;