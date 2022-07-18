
class Cart {
  private items: Array<number>;

  constructor() {
    this.items = [];
  }

  public addItem(item:number): void {
    this.items.push(item);
  }

  public removeItem(item: number): void {
    this.items = this.items.filter((value: number): boolean => value != item);
  }

  public setItems(items: Array<number>) {
    this.items = items;
  }

  public getItems(): Array<number> {
    return this.items;
  }

  public getSize(): number {
    return this.items.length;
  }
}

export default Cart;