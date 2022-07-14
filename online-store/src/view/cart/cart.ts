
class Cart {
  private items: Array<number>;

  constructor() {
    this.items = [];
  }

  addItem(item:number): void {
    this.items.push(item);
  }

  removeItem(item: number): void {
    this.items = this.items.filter(value => value != item);
  }

  setItems(items: Array<number>) {
    this.items = items;
  }

  getItems(): Array<number> {
    return this.items;
  }

  getSize(): number {
    return this.items.length;
  }
}

export default Cart;