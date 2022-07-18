import Cart from '../src/view/cart/cart';

describe('Cart class', () => {
  const cart: Cart = new Cart();

  it('should check that the value is defined', (): void => {
    expect(cart.getSize()).toBeDefined();
  });

  it('should check that the value is undefined', (): void => {
    expect(cart.setItems([1, 2])).toBeUndefined();
  });
});