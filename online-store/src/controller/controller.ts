import { ICard } from "../helpers/interfaces";
import Basket from "../view/cart/cart";
import Page from "../view/page/page";
import DataManager from "./data-manager";

type Tuple = [ICard, HTMLElement];

class Controller {
  private page: Page;
  private dataManager: DataManager;
  private cart: Basket;

  constructor() {
    this.page = new Page();
    this.dataManager = new DataManager();
    this.cart = new Basket();
  }

  setLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart.getItems()));
  }

  getLocalStorage() {
    if (localStorage.getItem('cart')) {
      this.cart.setItems(JSON.parse(localStorage.getItem('cart') as string));
    }
  }

  start() {

    this.getLocalStorage();
    this.page.drawCartLabel(this.cart.getSize());

    const cards: Array<Tuple> = this.page.fillCardContainer(this.dataManager.getOriginalData());

    if (this.cart.getSize()) {
      cards.filter((card: Tuple): boolean => this.cart.getItems().includes(card[0].id))
           .forEach((item: Tuple): void => {item[1].classList.add('in-cart');
      })
    }

    cards.forEach((card: Tuple) => card[1].onclick = (): void => {
      if (this.cart.getItems().includes(card[0].id)) {
        this.cart.removeItem(card[0].id);
        card[1].classList.remove('in-cart');
      } else {
        this.cart.addItem(card[0].id);
        card[1].classList.add('in-cart');
      }
      this.page.drawCartLabel(this.cart.getSize());
    });

    window.onunload = ():void => {
      this.setLocalStorage();
    }
  }
}

export default Controller;