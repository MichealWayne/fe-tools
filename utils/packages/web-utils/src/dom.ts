/**
 * @module DOM
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2025-09-07 21:24:32
 */

import { isUndefined } from 'utils';

/**
 * @function isPageVisible
 * @description 检查当前页面是否对用户可见（未隐藏或最小化）。Checks if the current page is visible to the user (not hidden or minimized)
 * @returns {boolean} 如果页面可见则为true，如果隐藏/最小化则为false。True if the page is visible, false if hidden/minimized
 * @throws {Error} 如果document不可用（非浏览器环境）则抛出错误。Throws if document is not available (non-browser environment)
 * @example
 * // Basic usage - pause animations when page is hidden
 * if (!isPageVisible()) {
 *   // Cancel requests, pause animations, etc.
 *   pauseVideoPlayback();
 *   clearInterval(animationTimer);
 * }
 *
 * @example
 * // Listen for visibility changes
 * document.addEventListener('visibilitychange', () => {
 *   if (isPageVisible()) {
 *     console.log('Page is now visible');
 *     resumeOperations();
 *   } else {
 *     console.log('Page is now hidden');
 *     pauseOperations();
 *   }
 * });
 *
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/hidden} - Browser compatibility: IE 10+, all modern browsers
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html} - WCAG accessibility guidelines for auto-playing content
 */
export function isPageVisible() {
  return !document.hidden;
}

/**
 * @function hasClass
 * @description 检查DOM元素是否包含特定的CSS类名。Checks if a DOM element contains a specific CSS class name
 * @param {HTMLElement} elem - 要检查的DOM元素。The DOM element to check
 * @param {string} className - 要查找的CSS类名（不带前导点）。The CSS class name to look for (without leading dot)
 * @returns {boolean} 如果元素包含指定类则为true，否则为false。True if the element contains the specified class, false otherwise
 * @throws {TypeError} 如果elem为null/undefined或className为空则抛出错误。Throws if elem is null/undefined or className is empty
 * @example
 * // Basic usage
 * const button = document.querySelector('.my-button');
 * if (hasClass(button, 'active')) {
 *   console.log('Button is active');
 * }
 *
 * @example
 * // Check multiple classes
 * const elem = document.createElement('div');
 * elem.className = 'nav-item active highlighted';
 * console.log(hasClass(elem, 'active')); // true
 * console.log(hasClass(elem, 'nav-item')); // true
 * console.log(hasClass(elem, 'disabled')); // false
 *
 * @example
 * // Handles edge cases with whitespace
 * const elem = document.createElement('div');
 * elem.className = '  spaced-class  ';
 * console.log(hasClass(elem, 'spaced-class')); // true
 * console.log(hasClass(elem, '  spaced-class  ')); // false (exact match required)
 *
 * @since 1.0.0
 * @see {@link addClass} - Add CSS classes to elements
 * @see {@link removeClass} - Remove CSS classes from elements
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/classList} - Modern classList API (IE 10+)
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html} - WCAG: Use semantic classes for accessibility
 */
export function hasClass(elem: HTMLElement, className: string) {
  return new RegExp(`(\\s|^)${className}(\\s|$)`).test(elem.className);
}

/**
 * @function addClass
 * @description 向DOM元素添加CSS类，为旧版浏览器提供回退方案。Adds a CSS class to a DOM element, with fallback for older browsers
 * @param {HTMLElement} elem - 要添加类的DOM元素。The DOM element to add the class to
 * @param {string} className - 要添加的CSS类名（不带前导点）。The CSS class name to add (without leading dot)
 * @returns {void}
 * @example
 * // Basic usage
 * const button = document.querySelector('.my-button');
 * addClass(button, 'active');
 * addClass(button, 'highlighted');
 *
 * @example
 * // Safe usage with null checks
 * const elem = document.getElementById('optional-element');
 * addClass(elem, 'new-class'); // Safely handles null elements
 *
 * @example
 * // Adding state classes for accessibility
 * const menuItem = document.querySelector('[role="menuitem"]');
 * addClass(menuItem, 'aria-selected'); // Visual indicator
 * menuItem.setAttribute('aria-selected', 'true'); // Screen reader support
 *
 * @since 1.0.0
 * @see {@link hasClass} - Check if element has a class
 * @see {@link removeClass} - Remove CSS classes from elements
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/classList} - Modern classList API (IE 10+)
 * @see {@link https://caniuse.com/classlist} - Browser support: IE 10+, all modern browsers
 * @see {@link https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/} - ARIA naming practices
 */
export function addClass(elem: HTMLElement, className: string) {
  if (!elem || !className) return;

  if (elem.classList) {
    elem.classList.add(className);
  } else {
    // 兼容不支持 classList 的旧浏览器
    if (!hasClass(elem, className)) {
      elem.className += ` ${className}`;
    }
  }
}

/**
 * @function removeClass
 * @description 从DOM元素中移除CSS类，为旧版浏览器提供回退方案。Removes a CSS class from a DOM element, with fallback for older browsers
 * @param {HTMLElement} elem - 要移除类的DOM元素。The DOM element to remove the class from
 * @param {string} className - 要移除的CSS类名（不带前导点）。The CSS class name to remove (without leading dot)
 * @returns {void}
 * @example
 * // Basic usage
 * const button = document.querySelector('.my-button');
 * removeClass(button, 'active');
 * removeClass(button, 'highlighted');
 *
 * @example
 * // Toggle functionality
 * const toggleButton = document.getElementById('toggle');
 * if (hasClass(toggleButton, 'expanded')) {
 *   removeClass(toggleButton, 'expanded');
 *   toggleButton.setAttribute('aria-expanded', 'false');
 * } else {
 *   addClass(toggleButton, 'expanded');
 *   toggleButton.setAttribute('aria-expanded', 'true');
 * }
 *
 * @example
 * // Clean up multiple classes
 * const elem = document.createElement('div');
 * elem.className = 'nav-item active selected';
 * removeClass(elem, 'active');
 * console.log(elem.className); // 'nav-item selected'
 *
 * @since 1.0.0
 * @see {@link addClass} - Add CSS classes to elements
 * @see {@link hasClass} - Check if element has a class
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/classList} - Modern classList API (IE 10+)
 * @see {@link https://caniuse.com/classlist} - Browser support: IE 10+, all modern browsers
 * @see {@link https://www.w3.org/WAI/ARIA/apg/practices/disclosure/} - ARIA disclosure patterns
 */
export function removeClass(elem: HTMLElement, className: string) {
  if (!elem || !className) return;

  if (elem.classList) {
    elem.classList.remove(className);
  } else {
    // 兼容不支持 classList 的旧浏览器
    if (hasClass(elem, className)) {
      const CLASS_NAME_REGEX = new RegExp(`(\\s|^)${className}(\\s|$)`);
      elem.className = elem.className.replace(CLASS_NAME_REGEX, ' ').trim();
    }
  }
}

/**
 * @description Inserts HTML content immediately after the specified element
 * @param {HTMLElement} elem - The reference element to insert content after
 * @param {string} htmlString - The HTML string to insert (must be valid HTML)
 * @returns {void}
 * @throws {DOMException} Throws if htmlString contains invalid HTML
 * @throws {TypeError} Throws if elem is null or not an HTMLElement
 * @example
 * // Insert a simple element after another
 * const target = document.getElementById('target');
 * insertAfter(target, '<div class="notification">Content added!</div>');
 *
 * @example
 * // Insert complex HTML structure
 * const listItem = document.querySelector('li:last-child');
 * const newItemHTML = `
 *   <li role="listitem">
 *     <span>New Item</span>
 *     <button aria-label="Remove item">×</button>
 *   </li>
 * `;
 * insertAfter(listItem, newItemHTML);
 *
 * @example
 * // Security consideration - sanitize user input
 * const userContent = escapeHTML(userInput);
 * const safeHTML = `<div class="user-content">${userContent}</div>`;
 * insertAfter(targetElement, safeHTML);
 *
 * @since 1.0.0
 * @see {@link insertBefore} - Insert content before an element
 * @see {@link escapeHTML} - Sanitize HTML content to prevent XSS
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML} - Browser support: IE 4+, all browsers
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/parsing.html} - WCAG: Ensure valid HTML markup
 * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html} - XSS prevention guidelines
 */
export function insertAfter(elem: HTMLElement, htmlString: string) {
  return elem.insertAdjacentHTML('afterend', htmlString);
}

/**
 * @description Inserts HTML content immediately before the specified element
 * @param {HTMLElement} elem - The reference element to insert content before
 * @param {string} htmlString - The HTML string to insert (must be valid HTML)
 * @returns {void}
 * @throws {DOMException} Throws if htmlString contains invalid HTML
 * @throws {TypeError} Throws if elem is null or not an HTMLElement
 * @example
 * // Insert a warning message before a form
 * const form = document.getElementById('signup-form');
 * insertBefore(form, '<div class="alert alert-warning">Please review your information</div>');
 *
 * @example
 * // Insert navigation breadcrumbs
 * const mainContent = document.querySelector('main');
 * const breadcrumbHTML = `
 *   <nav aria-label="Breadcrumb">
 *     <ol class="breadcrumb">
 *       <li><a href="/">Home</a></li>
 *       <li aria-current="page">Current Page</li>
 *     </ol>
 *   </nav>
 * `;
 * insertBefore(mainContent, breadcrumbHTML);
 *
 * @example
 * // Insert loading indicator before content
 * const contentArea = document.getElementById('content');
 * insertBefore(contentArea, '<div class="loading" aria-live="polite">Loading...</div>');
 *
 * @since 1.0.0
 * @see {@link insertAfter} - Insert content after an element
 * @see {@link escapeHTML} - Sanitize HTML content to prevent XSS
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML} - Browser support: IE 4+, all browsers
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/parsing.html} - WCAG: Ensure valid HTML markup
 * @see {@link https://www.w3.org/WAI/ARIA/apg/practices/landmarks/} - ARIA landmark practices
 */
export function insertBefore(elem: HTMLElement, htmlString: string) {
  return elem.insertAdjacentHTML('beforebegin', htmlString);
}

/**
 * @description Checks if a parent element contains a child element (excluding self-containment)
 * @param {HTMLElement} parent - The potential parent element
 * @param {HTMLElement} child - The potential child element to check for
 * @returns {boolean} True if parent contains child (but parent !== child), false otherwise
 * @throws {TypeError} Throws if parent or child is null/undefined
 * @example
 * // Basic containment check
 * const container = document.getElementById('container');
 * const button = document.querySelector('.submit-button');
 * if (elementContains(container, button)) {
 *   console.log('Button is inside container');
 * }
 *
 * @example
 * // Event delegation - check if clicked element is within a specific area
 * document.addEventListener('click', (event) => {
 *   const sidebar = document.getElementById('sidebar');
 *   if (elementContains(sidebar, event.target)) {
 *     console.log('Clicked inside sidebar');
 *   }
 * });
 *
 * @example
 * // Accessibility - check if focused element is within a modal
 * const modal = document.querySelector('[role="dialog"]');
 * const focusedElement = document.activeElement;
 * if (!elementContains(modal, focusedElement)) {
 *   // Return focus to modal if it escaped
 *   modal.querySelector('[tabindex="0"]')?.focus();
 * }
 *
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/contains} - Browser support: IE 9+, all modern browsers
 * @see {@link https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/} - ARIA keyboard navigation practices
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/} - Modal dialog accessibility patterns
 */
export function elementContains(parent: HTMLElement, child: HTMLElement) {
  return parent !== child && parent.contains(child);
}

/**
 * @description Hides one or more DOM elements by setting display: none
 * @param {...HTMLElement} elems - Variable number of DOM elements to hide
 * @returns {void}
 * @example
 * // Hide single element
 * const modal = document.getElementById('modal');
 * hide(modal);
 *
 * @example
 * // Hide multiple elements at once
 * const buttons = document.querySelectorAll('.temporary-button');
 * hide(...buttons);
 *
 * @example
 * // Accessible hiding with proper ARIA attributes
 * const tooltip = document.getElementById('tooltip');
 * hide(tooltip);
 * tooltip.setAttribute('aria-hidden', 'true');
 *
 * @example
 * // Conditional hiding based on user preferences
 * const animations = document.querySelectorAll('.animated');
 * if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
 *   hide(...animations);
 * }
 *
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/display} - CSS display property
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html} - WCAG: Content on hover or focus
 * @see {@link https://www.w3.org/WAI/ARIA/apg/practices/hiding/} - ARIA hiding techniques
 * @see {@link https://web.dev/prefers-reduced-motion/} - Respecting user motion preferences
 */
export function hide(...elems: HTMLElement[]) {
  [...elems].forEach(e => (e.style.display = 'none'));
}

/**
 * @description Converts a NodeList or HTMLCollection to a proper Array for easier manipulation
 * @param {NodeList|HTMLCollection|HTMLElement[]} nodeList - The node collection to convert
 * @returns {HTMLElement[]} A new array containing all elements from the node list
 * @example
 * // Convert NodeList from querySelectorAll to array
 * const divs = document.querySelectorAll('div');
 * const divArray = nodeListToArray(divs);
 *
 * // Now you can use array methods
 * divArray.forEach(div => {
 *   div.classList.add('processed');
 * });
 *
 * @example
 * // Filter and map operations on DOM elements
 * const buttons = document.querySelectorAll('button');
 * const buttonArray = nodeListToArray(buttons);
 *
 * const enabledButtons = buttonArray
 *   .filter(btn => !btn.disabled)
 *   .map(btn => btn.textContent);
 *
 * @example
 * // Convert HTMLCollection (live collection) to static array
 * const forms = document.forms; // HTMLCollection
 * const formArray = nodeListToArray(forms);
 *
 * // Safe to iterate even if DOM changes
 * formArray.forEach(form => {
 *   form.addEventListener('submit', handleSubmit);
 * });
 *
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/NodeList} - NodeList documentation
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection} - HTMLCollection documentation
 * @see {@link https://caniuse.com/es6-array-from} - Browser support for Array.from (IE 9+ with polyfill)
 */
export function nodeListToArray(nodeList: HTMLElement[]) {
  return [...nodeList];
}

/**
 * @description Sets an attribute on a DOM element with special handling for style and value attributes
 * @param {HTMLElement} elem - The DOM element to set the attribute on
 * @param {string} key - The attribute name (e.g., 'id', 'class', 'style', 'value')
 * @param {string} value - The attribute value to set
 * @returns {void}
 * @throws {TypeError} Throws if elem is null/undefined
 * @example
 * // Set basic attributes
 * const button = document.createElement('button');
 * setAttribute(button, 'id', 'submit-btn');
 * setAttribute(button, 'class', 'btn btn-primary');
 * setAttribute(button, 'type', 'submit');
 *
 * @example
 * // Set styles (uses cssText for better performance)
 * const elem = document.getElementById('myElement');
 * setAttribute(elem, 'style', 'color: red; font-size: 16px; margin: 10px;');
 *
 * @example
 * // Set form input values (handles input/textarea specially)
 * const input = document.getElementById('username');
 * setAttribute(input, 'value', 'john_doe');
 * setAttribute(input, 'placeholder', 'Enter username');
 *
 * @example
 * // Set accessibility attributes
 * const menuButton = document.querySelector('.menu-toggle');
 * setAttribute(menuButton, 'aria-expanded', 'false');
 * setAttribute(menuButton, 'aria-controls', 'main-menu');
 * setAttribute(menuButton, 'aria-label', 'Toggle navigation menu');
 *
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute} - Browser support: All browsers
 * @see {@link https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/} - ARIA attribute practices
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style} - Style property documentation
 */
export function setAttribute(elem: HTMLElement, key: string, value: string) {
  const tagName = (elem.tagName || '').toLowerCase();
  switch (key) {
    case 'style':
      elem.style.cssText = value;
      break;
    case 'value':
      if (tagName === 'input' || tagName === 'textarea') {
        (elem as HTMLInputElement).value = value;
      } else {
        elem.setAttribute(key, value);
      }
      break;
    default:
      elem.setAttribute(key, value);
      break;
  }
}

/**
 * @description Escapes HTML special characters to prevent XSS attacks and ensure safe text display
 * @param {string} str - The string to escape (handles null/undefined gracefully)
 * @returns {string} The escaped string with HTML entities, or original if null/undefined
 * @example
 * // Basic XSS prevention
 * const userInput = '<script>alert("XSS")</script>';
 * const safeText = escapeHTML(userInput);
 * console.log(safeText); // '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
 *
 * @example
 * // Safe display of user content
 * const commentText = escapeHTML(user.comment);
 * document.getElementById('comment').innerHTML = `<p>${commentText}</p>`;
 *
 * @example
 * // Real-time input sanitization
 * const inputBox = document.getElementById('input-box');
 * const outputBox = document.getElementById('output-box');
 *
 * inputBox.addEventListener('input', () => {
 *   const escapedText = escapeHTML(inputBox.value);
 *   outputBox.textContent = escapedText; // Use textContent for additional safety
 * });
 *
 * @example
 * // Escape quotes for HTML attributes
 * const title = `User said: "Hello & goodbye"`;
 * const escapedTitle = escapeHTML(title);
 * element.setAttribute('title', escapedTitle);
 *
 * @since 1.0.0
 * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html} - OWASP XSS Prevention
 * @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Entity} - HTML entities reference
 * @see {@link https://www.w3.org/International/questions/qa-escapes} - W3C character escaping guidelines
 */
export function escapeHTML(str: string) {
  return str?.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        // eslint-disable-next-line quotes
        "'": '&#39;',
        '"': '&quot;',
      }[tag] || tag)
  );
}

/* scorll */

/**
 * @description Gets the absolute position of an element relative to the document, similar to jQuery's offset()
 * @param {HTMLElement} [elem] - The DOM element to get position for
 * @returns {{left: number, top: number}} Object containing left and top coordinates in pixels
 * @example
 * // Get element position for tooltip placement
 * const button = document.getElementById('help-button');
 * const pos = getOffsetPos(button);
 *
 * const tooltip = document.getElementById('tooltip');
 * tooltip.style.left = `${pos.left}px`;
 * tooltip.style.top = `${pos.top + button.offsetHeight + 5}px`;
 *
 * @example
 * // Calculate if element is in viewport
 * const element = document.querySelector('.lazy-load');
 * const elementPos = getOffsetPos(element);
 * const viewportHeight = window.innerHeight;
 * const scrollTop = getScrollTop();
 *
 * if (elementPos.top < scrollTop + viewportHeight) {
 *   // Element is visible, load content
 *   loadContent(element);
 * }
 *
 * @example
 * // Position floating elements relative to target
 * const targetElement = document.getElementById('anchor');
 * const floatingPanel = document.getElementById('panel');
 * const targetPos = getOffsetPos(targetElement);
 *
 * floatingPanel.style.position = 'absolute';
 * floatingPanel.style.left = `${targetPos.left}px`;
 * floatingPanel.style.top = `${targetPos.top}px`;
 *
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft} - Browser support: All browsers
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent} - offsetParent documentation
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html} - WCAG: Focus indicators and positioning
 */
export function getOffsetPos(elem?: HTMLElement) {
  const pos = {
    left: 0,
    top: 0,
  };

  while (elem) {
    pos.left += elem.offsetLeft;
    pos.top += elem.offsetTop;
    // eslint-disable-next-line no-param-reassign
    elem = elem.offsetParent as HTMLElement;
  }

  return pos;
}

/**
 * @description Gets the current vertical scroll position of the document
 * @returns {number} The number of pixels scrolled from the top of the document
 * @example
 * // Show/hide scroll-to-top button based on scroll position
 * window.addEventListener('scroll', () => {
 *   const scrollTop = getScrollTop();
 *   const scrollButton = document.getElementById('scroll-to-top');
 *
 *   if (scrollTop > 300) {
 *     scrollButton.style.display = 'block';
 *     scrollButton.setAttribute('aria-hidden', 'false');
 *   } else {
 *     scrollButton.style.display = 'none';
 *     scrollButton.setAttribute('aria-hidden', 'true');
 *   }
 * });
 *
 * @example
 * // Implement scroll progress indicator
 * function updateScrollProgress() {
 *   const scrollTop = getScrollTop();
 *   const docHeight = document.documentElement.scrollHeight - window.innerHeight;
 *   const scrollPercent = (scrollTop / docHeight) * 100;
 *
 *   const progressBar = document.getElementById('scroll-progress');
 *   progressBar.style.width = `${scrollPercent}%`;
 *   progressBar.setAttribute('aria-valuenow', scrollPercent.toString());
 * }
 *
 * @example
 * // Lazy loading based on scroll position
 * const images = document.querySelectorAll('img[data-src]');
 * window.addEventListener('scroll', () => {
 *   const scrollTop = getScrollTop();
 *   const viewportHeight = window.innerHeight;
 *
 *   images.forEach(img => {
 *     const imgTop = getOffsetPos(img).top;
 *     if (imgTop < scrollTop + viewportHeight + 100) {
 *       img.src = img.dataset.src;
 *       img.removeAttribute('data-src');
 *     }
 *   });
 * });
 *
 * @since 1.0.0
 * @see {@link setScrollTop} - Set scroll position
 * @see {@link getScrollPosition} - Get both X and Y scroll positions
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop} - Browser support: All browsers
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html} - WCAG: Maintaining focus during scroll
 */
export function getScrollTop() {
  return document.documentElement?.scrollTop || document.body.scrollTop;
}

/**
 * @description Gets the current scroll position (both X and Y) of the document or specified element
 * @param {Window|Element} [elem=window] - The element to get scroll position from (defaults to window)
 * @returns {{x: number, y: number}} Object containing horizontal (x) and vertical (y) scroll positions
 * @example
 * // Get current document scroll position
 * const scrollPos = getScrollPosition();
 * console.log(`Scrolled ${scrollPos.x}px horizontally, ${scrollPos.y}px vertically`);
 *
 * @example
 * // Save and restore scroll position (useful for SPAs)
 * const savedPosition = getScrollPosition();
 * localStorage.setItem('scrollPosition', JSON.stringify(savedPosition));
 *
 * // Later, restore position
 * const restored = JSON.parse(localStorage.getItem('scrollPosition'));
 * window.scrollTo(restored.x, restored.y);
 *
 * @example
 * // Get scroll position of specific scrollable element
 * const scrollableDiv = document.getElementById('scrollable-content');
 * const divScrollPos = getScrollPosition(scrollableDiv);
 *
 * // Sync scroll positions between elements
 * const otherDiv = document.getElementById('other-scrollable');
 * otherDiv.scrollTo(divScrollPos.x, divScrollPos.y);
 *
 * @example
 * // Implement scroll synchronization for accessibility
 * const mainContent = document.getElementById('main-content');
 * const minimap = document.getElementById('minimap');
 *
 * mainContent.addEventListener('scroll', () => {
 *   const pos = getScrollPosition(mainContent);
 *   const ratio = minimap.scrollHeight / mainContent.scrollHeight;
 *   minimap.scrollTo(pos.x * ratio, pos.y * ratio);
 * });
 *
 * @since 1.0.0
 * @see {@link getScrollTop} - Get vertical scroll position only
 * @see {@link setScrollTop} - Set vertical scroll position
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/pageXOffset} - Browser support: All browsers
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html} - WCAG: Focus management during navigation
 */
export function getScrollPosition(elem = window) {
  return {
    x: !isUndefined(elem.pageXOffset) ? elem.pageXOffset : elem.screenLeft,
    y: !isUndefined(elem.pageYOffset) ? elem.pageYOffset : elem.screenTop,
  };
}

/**
 * @description Sets the vertical scroll position of the document
 * @param {number} height - The vertical scroll position in pixels
 * @returns {number} The height value that was set
 * @example
 * // Scroll to top of page
 * setScrollTop(0);
 *
 * @example
 * // Scroll to specific section
 * const section = document.getElementById('target-section');
 * const sectionTop = getOffsetPos(section).top;
 * setScrollTop(sectionTop - 20); // 20px offset for better UX
 *
 * @example
 * // Implement "scroll to top" button with accessibility
 * const scrollToTopButton = document.getElementById('scroll-to-top');
 * scrollToTopButton.addEventListener('click', () => {
 *   setScrollTop(0);
 *
 *   // Announce to screen readers
 *   const announcement = document.createElement('div');
 *   announcement.setAttribute('aria-live', 'polite');
 *   announcement.textContent = 'Scrolled to top of page';
 *   document.body.appendChild(announcement);
 *
 *   setTimeout(() => document.body.removeChild(announcement), 1000);
 * });
 *
 * @example
 * // Restore scroll position after page reload
 * window.addEventListener('beforeunload', () => {
 *   sessionStorage.setItem('scrollTop', getScrollTop().toString());
 * });
 *
 * window.addEventListener('load', () => {
 *   const savedScrollTop = sessionStorage.getItem('scrollTop');
 *   if (savedScrollTop) {
 *     setScrollTop(parseInt(savedScrollTop, 10));
 *   }
 * });
 *
 * @since 1.0.0
 * @see {@link getScrollTop} - Get current scroll position
 * @see {@link animateScrollTo} - Smooth animated scrolling
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo} - Browser support: All browsers
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html} - WCAG: Managing focus during scroll
 */
export function setScrollTop(height: number) {
  window.scrollTo(0, height);
  return height;
}

/**
 * @description Cross-browser compatible requestAnimationFrame with fallback for older browsers
 * @type {Function}
 * @param {Function} callback - Function to call before the next repaint
 * @returns {number} Request ID that can be used with cancelAnimationFrame
 * @example
 * // Basic animation loop
 * function animate() {
 *   // Update animation state
 *   updatePosition();
 *
 *   // Continue animation
 *   requestAnimFrame(animate);
 * }
 * requestAnimFrame(animate);
 *
 * @example
 * // Smooth element movement with performance optimization
 * let animationId;
 * function moveElement(element, targetX, targetY) {
 *   const currentX = parseFloat(element.style.left) || 0;
 *   const currentY = parseFloat(element.style.top) || 0;
 *
 *   const deltaX = (targetX - currentX) * 0.1;
 *   const deltaY = (targetY - currentY) * 0.1;
 *
 *   element.style.left = `${currentX + deltaX}px`;
 *   element.style.top = `${currentY + deltaY}px`;
 *
 *   if (Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1) {
 *     animationId = requestAnimFrame(() => moveElement(element, targetX, targetY));
 *   }
 * }
 *
 * @example
 * // Accessible animation with reduced motion support
 * function startAnimation() {
 *   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 *
 *   if (prefersReducedMotion) {
 *     // Skip animation, apply final state immediately
 *     applyFinalState();
 *     return;
 *   }
 *
 *   function animateStep() {
 *     updateAnimationFrame();
 *     if (!animationComplete) {
 *       requestAnimFrame(animateStep);
 *     }
 *   }
 *
 *   requestAnimFrame(animateStep);
 * }
 *
 * @since 1.0.0
 * @see {@link animateScrollTo} - Uses this function for smooth scrolling
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame} - Browser support: IE 10+, all modern browsers
 * @see {@link https://caniuse.com/requestanimationframe} - Browser compatibility table
 * @see {@link https://web.dev/prefers-reduced-motion/} - Respecting user motion preferences
 */
declare global {
  interface Window {
    mozRequestAnimationFrame?: any;
  }
}
export const requestAnimFrame = (function () {
  if (typeof window !== 'undefined') {
    return (
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window['webkitRequestAnimationFrame' as any]
    );
  }

  return function (callback: (...args: unknown[]) => unknown) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

/**
 * @description Smoothly animates scrolling to a specific vertical position over a given duration
 * @param {number} to - Target scroll position in pixels
 * @param {number} duration - Animation duration in milliseconds
 * @returns {void}
 * @example
 * // Smooth scroll to top over 500ms
 * animateScrollTo(0, 500);
 *
 * @example
 * // Scroll to specific section with smooth animation
 * const targetSection = document.getElementById('contact');
 * const targetPosition = getOffsetPos(targetSection).top - 60; // Account for fixed header
 * animateScrollTo(targetPosition, 800);
 *
 * @example
 * // Accessible smooth scrolling with reduced motion support
 * function scrollToSection(sectionId) {
 *   const section = document.getElementById(sectionId);
 *   const targetPos = getOffsetPos(section).top;
 *
 *   // Respect user's motion preferences
 *   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 *   const duration = prefersReducedMotion ? 0 : 600;
 *
 *   animateScrollTo(targetPos, duration);
 *
 *   // Update focus for accessibility
 *   section.setAttribute('tabindex', '-1');
 *   section.focus();
 * }
 *
 * @example
 * // Scroll to form errors with animation
 * function scrollToFirstError() {
 *   const firstError = document.querySelector('.field-error');
 *   if (firstError) {
 *     const errorPos = getOffsetPos(firstError).top - 100;
 *     animateScrollTo(errorPos, 400);
 *
 *     // Announce error to screen readers
 *     firstError.setAttribute('aria-live', 'assertive');
 *   }
 * }
 *
 * @since 1.0.0
 * @see {@link setScrollTop} - Instant scroll positioning
 * @see {@link smoothScroll} - CSS-based smooth scrolling
 * @see {@link requestAnimFrame} - Animation frame utility
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame} - Browser support: IE 10+, all modern browsers
 * @see {@link https://web.dev/prefers-reduced-motion/} - Respecting motion preferences
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html} - WCAG: Focus management during scroll
 */
export function animateScrollTo(to: number, duration: number) {
  if (duration < 0) {
    setScrollTop(to);
    return;
  }

  const diff = to - getScrollTop();
  if (diff === 0) return;

  const step = (diff / duration) * 10;
  requestAnimationFrame(function () {
    if (Math.abs(step) > Math.abs(diff)) {
      setScrollTop(getScrollTop() + diff);
      return;
    }

    setScrollTop(getScrollTop() + step);
    if ((diff > 0 && getScrollTop() >= to) || (diff < 0 && getScrollTop() <= to)) {
      return;
    }

    animateScrollTo(to, duration - 16);
  });
}

/**
 * @description Smoothly scrolls an element into view using native CSS scroll behavior
 * @param {string} elemSelector - CSS selector for the target element
 * @returns {void}
 * @example
 * // Scroll to a specific section
 * smoothScroll('#about-section');
 *
 * @example
 * // Scroll to form validation errors
 * const firstError = document.querySelector('.error');
 * if (firstError) {
 *   smoothScroll('.error');
 *   firstError.focus(); // Improve accessibility
 * }
 *
 * @example
 * // Navigation menu with smooth scrolling
 * document.querySelectorAll('.nav-link').forEach(link => {
 *   link.addEventListener('click', (e) => {
 *     e.preventDefault();
 *     const targetId = link.getAttribute('href');
 *     smoothScroll(targetId);
 *
 *     // Update URL without jumping
 *     history.pushState(null, null, targetId);
 *   });
 * });
 *
 * @example
 * // Accessible skip link implementation
 * const skipLink = document.getElementById('skip-to-main');
 * skipLink.addEventListener('click', (e) => {
 *   e.preventDefault();
 *   smoothScroll('#main-content');
 *
 *   // Set focus for screen readers
 *   const mainContent = document.getElementById('main-content');
 *   mainContent.setAttribute('tabindex', '-1');
 *   mainContent.focus();
 * });
 *
 * @since 1.0.0
 * @see {@link animateScrollTo} - Custom animated scrolling with duration control
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView} - Browser support: IE 6+, smooth behavior in modern browsers
 * @see {@link https://caniuse.com/css-scroll-behavior} - CSS scroll-behavior support
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html} - WCAG: Skip navigation mechanisms
 */
export function smoothScroll(elemSelector: string) {
  document.querySelector(elemSelector)?.scrollIntoView({
    behavior: 'smooth',
  });
}

/**
 * @description Disables copy and paste functionality on the webpage (use with caution for accessibility)
 * @returns {Function} Cleanup function to restore original copy/paste behavior
 * @example
 * // Temporarily disable copy/paste for sensitive content
 * const restoreCopyPaste = disableCopy();
 *
 * // Later, restore functionality
 * setTimeout(() => {
 *   restoreCopyPaste();
 * }, 5000);
 *
 * @example
 * // Disable copy/paste during exam or secure content viewing
 * let copyPasteDisabled = false;
 * const toggleCopyPaste = document.getElementById('toggle-security');
 *
 * toggleCopyPaste.addEventListener('click', () => {
 *   if (copyPasteDisabled) {
 *     restoreFunction();
 *     copyPasteDisabled = false;
 *     toggleCopyPaste.textContent = 'Disable Copy/Paste';
 *   } else {
 *     restoreFunction = disableCopy();
 *     copyPasteDisabled = true;
 *     toggleCopyPaste.textContent = 'Enable Copy/Paste';
 *   }
 * });
 *
 * @example
 * // Provide alternative for accessibility when disabling copy
 * const restoreCopy = disableCopy();
 *
 * // Add accessible alternative
 * const copyButton = document.createElement('button');
 * copyButton.textContent = 'Copy Content';
 * copyButton.setAttribute('aria-label', 'Copy page content to clipboard');
 * copyButton.addEventListener('click', () => {
 *   navigator.clipboard.writeText(document.body.textContent);
 * });
 * document.body.appendChild(copyButton);
 *
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/clipboard} - Modern clipboard API
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html} - WCAG: Keyboard accessibility considerations
 * @see {@link https://webaim.org/articles/usability/} - Web accessibility and usability guidelines
 * @deprecated Consider accessibility implications before disabling copy/paste functionality
 */
export function disableCopy() {
  const html = document.querySelector('html');
  if (!html) {
    return () => {};
  }

  const originalOnCopy = html.oncopy;
  const originalOnPaste = html.onpaste;

  html.oncopy = () => false;
  html.onpaste = () => false;

  // 返回取消监听的回调函数
  return () => {
    html.oncopy = originalOnCopy;
    html.onpaste = originalOnPaste;
  };
}
