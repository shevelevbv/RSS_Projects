import { createElement } from '../src/helpers/functions';

describe('CreateElement function', () => {
  it('checks the function does not throw error with valid arguments', () => {
    expect(() => {
      createElement(null, 'div', '', '')
    }).not.toThrow();
  });
});