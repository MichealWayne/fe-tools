/**
 * @author Wayne
 * @Date 2025-06-08 17:25:17
 * @LastEditTime 2025-06-09 19:18:48
 */
import {
  isPageVisible,
  hasClass,
  addClass,
  removeClass,
  setAttribute,
  escapeHTML,
  getScrollPosition,
  nodeListToArray,
  elementContains,
} from '../src/dom';

/**
 * Check if code is running in browser environment
 */
const isBrowser = () => typeof window !== 'undefined';

// Mock setup for DOM testing
beforeEach(() => {
  // Reset the document body before each test
  document.body.innerHTML = '';
});

describe('DOM Utils', () => {
  test('isBrowser should return true in browser environment', () => {
    expect(isBrowser()).toBe(true);
  });

  test('isPageVisible should detect page visibility', () => {
    // Since we can't actually change document.hidden in a test, we mock it
    const originalHidden = document.hidden;

    // Mock visible
    Object.defineProperty(document, 'hidden', { value: false, writable: true });
    expect(isPageVisible()).toBe(true);

    // Mock hidden
    Object.defineProperty(document, 'hidden', { value: true, writable: true });
    expect(isPageVisible()).toBe(false);

    // Restore original value
    Object.defineProperty(document, 'hidden', { value: originalHidden });
  });

  describe('Class manipulation', () => {
    let testElement: HTMLElement;

    beforeEach(() => {
      testElement = document.createElement('div');
      document.body.appendChild(testElement);
    });

    test('hasClass should detect if element has class', () => {
      testElement.className = 'test-class';
      expect(hasClass(testElement, 'test-class')).toBe(true);
      expect(hasClass(testElement, 'non-existent')).toBe(false);

      // Test with multiple classes
      testElement.className = 'first-class test-class last-class';
      expect(hasClass(testElement, 'test-class')).toBe(true);
      expect(hasClass(testElement, 'first-class')).toBe(true);
      expect(hasClass(testElement, 'last-class')).toBe(true);
    });

    test('addClass should add class to element', () => {
      testElement.className = '';
      addClass(testElement, 'new-class');
      expect(testElement.className.trim()).toBe('new-class');

      // Adding the same class again should not duplicate it
      addClass(testElement, 'new-class');
      expect(testElement.className.trim()).toBe('new-class');

      // Adding another class
      addClass(testElement, 'second-class');
      expect(testElement.className.trim()).toBe('new-class second-class');
    });

    test('removeClass should remove class from element', () => {
      testElement.className = 'class1 class2 class3';
      removeClass(testElement, 'class2');
      expect(testElement.className.trim()).toBe('class1 class3');

      // Removing a non-existent class should not change anything
      removeClass(testElement, 'non-existent');
      expect(testElement.className.trim()).toBe('class1 class3');

      // Remove remaining classes
      removeClass(testElement, 'class1');
      removeClass(testElement, 'class3');
      expect(testElement.className.trim()).toBe('');
    });
  });

  test('setAttribute should set attributes correctly', () => {
    const div = document.createElement('div');

    // Test regular attribute
    setAttribute(div, 'data-test', 'value');
    expect(div.getAttribute('data-test')).toBe('value');

    // Test style attribute
    setAttribute(div, 'style', 'color: red; font-size: 16px;');
    expect(div.style.color).toBe('red');
    expect(div.style.fontSize).toBe('16px');

    // Test value attribute on input
    const input = document.createElement('input');
    setAttribute(input, 'value', 'test value');
    expect((input as HTMLInputElement).value).toBe('test value');

    // Test value attribute on textarea
    const textarea = document.createElement('textarea');
    setAttribute(textarea, 'value', 'test area value');
    expect((textarea as HTMLTextAreaElement).value).toBe('test area value');
  });

  test('escapeHTML should escape HTML special characters', () => {
    const input = '<script>alert("XSS");</script> & "quoted" text';
    const expected =
      '&lt;script&gt;alert(&quot;XSS&quot;);&lt;/script&gt; &amp; &quot;quoted&quot; text';
    expect(escapeHTML(input)).toBe(expected);

    // Should handle empty/null/undefined strings
    expect(escapeHTML('')).toBe('');
    expect(escapeHTML(undefined as any)).toBe(undefined);
    expect(escapeHTML(null as any)).toBe(null);
  });

  test('nodeListToArray should convert NodeList to Array', () => {
    // Create a few divs
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');

    document.body.appendChild(div1);
    document.body.appendChild(div2);
    document.body.appendChild(div3);

    const nodeList = document.querySelectorAll('div');
    const array = nodeListToArray(nodeList as any as HTMLElement[]);

    expect(Array.isArray(array)).toBe(true);
    expect(array.length).toBe(3);
    expect(array[0]).toBe(div1);
    expect(array[1]).toBe(div2);
    expect(array[2]).toBe(div3);
  });

  test('elementContains should check if element contains child', () => {
    const parent = document.createElement('div');
    const child = document.createElement('span');
    const unrelated = document.createElement('p');

    parent.appendChild(child);
    document.body.appendChild(parent);
    document.body.appendChild(unrelated);

    expect(elementContains(parent, child)).toBe(true);
    expect(elementContains(parent, unrelated)).toBe(false);
    expect(elementContains(parent, parent)).toBe(false); // Same element
  });

  test('getScrollPosition should return scroll position', () => {
    // We can't really test actual scrolling in JSDOM, so we mock window.pageXOffset/pageYOffset
    const originalPageXOffset = window.pageXOffset;
    const originalPageYOffset = window.pageYOffset;

    Object.defineProperty(window, 'pageXOffset', { value: 100, writable: true });
    Object.defineProperty(window, 'pageYOffset', { value: 200, writable: true });

    const position = getScrollPosition();
    expect(position.x).toBe(100);
    expect(position.y).toBe(200);

    // Restore original values
    Object.defineProperty(window, 'pageXOffset', { value: originalPageXOffset });
    Object.defineProperty(window, 'pageYOffset', { value: originalPageYOffset });
  });
});
