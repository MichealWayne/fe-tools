import {
    isBrowser,
} from '../webAPI/dom'

/**
 * dom
 */
test('isBrowser test', () => {
    expect(isBrowser()).toBe(false);
});
