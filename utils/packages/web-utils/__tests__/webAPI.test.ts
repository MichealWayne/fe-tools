import { isBrowser } from '../src/dom';

/**
 * dom
 */
test('isBrowser test', () => {
  expect(isBrowser()).toBe(true);
});
