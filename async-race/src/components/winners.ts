import createElement from '../helpers/functions';

class Winners {
  public winnersContainer: HTMLDivElement;

  public winnersTableContainer: HTMLDivElement;

  public backButton: HTMLButtonElement;

  public nextButton: HTMLButtonElement;

  public pageCount: number;

  public static readonly winnersPerPage = 10;

  constructor() {
    this.winnersContainer = createElement(null, 'div', 'winners-container');
    this.winnersTableContainer = createElement(null, 'div', 'winners_table_container');
    this.backButton = createElement(null, 'button', 'button button_back', 'BACK');
    this.nextButton = createElement(null, 'button', 'button button_next', 'NEXT');
    this.pageCount = 1;
  }

  public renderWinners = (main: HTMLDivElement, total: number): void => {
    this.winnersContainer.innerHTML = '';
    main.append(this.winnersContainer);

    createElement(this.winnersContainer, 'h2', 'title__total', `Garage (${total})`);
    createElement(this.winnersContainer, 'h3', 'title__page', `Page #${this.pageCount}`);

    const isFirstPage = this.pageCount === 1;

    if (isFirstPage) {
      this.backButton.disabled = true;
    } else {
      this.backButton.disabled = false;
    }

    if (total <= Winners.winnersPerPage * this.pageCount) {
      this.nextButton.disabled = true;
    } else {
      this.nextButton.disabled = false;
    }

    this.winnersContainer.append(this.winnersTableContainer);

    const navButtons: HTMLDivElement = createElement(this.winnersTableContainer, 'div', 'nav-buttons_container');
    navButtons.append(this.backButton, this.nextButton);
  };
}

export default Winners;
