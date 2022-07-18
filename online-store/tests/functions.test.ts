import { createElement } from '../src/helpers/functions';

describe('CreateElement function', (): void => {
  it('checks the function does not throw error with valid arguments', () => {
    expect((): void => {
      createElement(null, 'div', '', '')
    }).not.toThrow();
  });
});