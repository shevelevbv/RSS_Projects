import Cart from '../src/view/cart/cart';

describe('Cart class', () => {
  const cart = new Cart();

  it('should check that the value is defined', () => {
    expect(cart.getSize()).toBeDefined();
  });

  it('should check that the value is undefined', () => {
    expect(cart.setItems([1, 2])).toBeUndefined();
  });
});