import './winners.scss';
import createElement from '../../helpers/functions';
import { ICar, IWinner } from '../../helpers/interfaces';
import Car from '../car';

class Winners {
  public winnersContainer: HTMLDivElement;

  public winnersTableContainer: HTMLDivElement;

  public backButton: HTMLButtonElement;

  public nextButton: HTMLButtonElement;

  public winsSortButton: HTMLButtonElement;

  public timeSortButton: HTMLButtonElement;

  public pageCount: number;

  public static readonly winnersPerPage = 10;

  constructor() {
    this.winnersContainer = createElement(null, 'div', 'winners__container');
    this.winnersTableContainer = createElement(null, 'div', 'winners__table_container');
    this.backButton = createElement(null, 'button', 'button button_back_winners', 'BACK');
    this.nextButton = createElement(null, 'button', 'button button_next_winners', 'NEXT');
    this.winsSortButton = createElement(null, 'button', 'button button_wins', 'Wins');
    this.timeSortButton = createElement(null, 'button', 'button button_time', 'Time↑');
    this.pageCount = 1;
  }

  public renderWinners = (main: HTMLDivElement, total: number): void => {
    this.winnersContainer.innerHTML = '';
    main.append(this.winnersContainer);

    createElement(this.winnersContainer, 'h2', 'title title__total', `Winners (${total})`);
    createElement(this.winnersContainer, 'h3', 'title title__page', `Page #${this.pageCount}`);

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

    const navButtons: HTMLDivElement = createElement(this.winnersContainer, 'div', 'nav-buttons_container');
    navButtons.append(this.backButton, this.nextButton);
  };

  public renderTable = async (winners: Array<IWinner>, cars: Array<ICar>): Promise<void> => {
    this.winnersTableContainer.innerHTML = '';
    const winnersTable = createElement(this.winnersTableContainer, 'table', 'winners__table');
    const tableHeader = createElement(winnersTable, 'thead', 'winners__thead');
    createElement(tableHeader, 'th', 'winners__column_number', 'Number');
    createElement(tableHeader, 'th', 'winners__column_car', 'Car');
    createElement(tableHeader, 'th', 'winners__column_name', 'Name');
    const wins = createElement(tableHeader, 'th', 'winners__column_wins');
    wins.append(this.winsSortButton);
    const time = createElement(tableHeader, 'th', 'winners__column_time');
    time.append(this.timeSortButton);
    winners.forEach((winner, index) => {
      const row = createElement(winnersTable, 'tr');
      createElement(row, 'td', 'winners__cell winners__cell_number', `${index + (this.pageCount - 1) * Winners.winnersPerPage + 1}`);
      const carCell = createElement(row, 'td', 'winners__cell winners__cell_car');
      const carLogoContainer = new Car(cars[index]).renderCar(false);
      carLogoContainer.className = 'winners__logo_container';
      carCell.append(carLogoContainer);
      createElement(row, 'td', 'winners__cell winners__cell_name', `${cars[index].name}`);
      createElement(row, 'td', 'winners__cell winners__cell_wins', `${winner.wins}`);
      createElement(row, 'td', 'winners__cell winners__cell_time', `${winner.time}`);
    });
  };
}

export default Winners;
