/**
 * @author Wayne
 * @Date 2025-06-08 18:05:17
 * @LastEditTime 2025-06-09 19:18:39
 */
import { getCookie, setCookie, delCookie } from '../src/cookies';

describe('Cookies', () => {
  // Save the original document.cookie
  const originalDocumentCookie = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') || {
    get: () => '',
    set: () => {
      /* empty */
    },
    configurable: true,
  };

  // Mock document.cookie
  let cookieStore = '';

  beforeEach(() => {
    // Reset cookie store
    cookieStore = '';

    // Mock document.cookie getter and setter
    Object.defineProperty(document, 'cookie', {
      get: jest.fn(() => cookieStore),
      set: jest.fn(value => {
        // This is a simplified implementation just for testing
        // It doesn't handle all the complexities of real cookie behavior
        const [cookiePart] = value.split(';');
        const [name, val] = cookiePart.split('=');

        // Just append the cookie string for simplicity
        // Real cookie behavior would replace existing cookies with the same name
        if (cookieStore) {
          cookieStore += '; ';
        }
        cookieStore += `${name}=${val}`;
      }),
      configurable: true,
    });
  });

  afterEach(() => {
    // Restore the original document.cookie
    Object.defineProperty(document, 'cookie', originalDocumentCookie);
  });

  describe('getCookie', () => {
    it('should return null if cookie does not exist', () => {
      expect(getCookie('nonexistent')).toBeNull();
    });

    it('should return the cookie value if cookie exists', () => {
      // Set up the cookie store directly
      cookieStore = 'name=John; test=value';

      expect(getCookie('name')).toBe('John');
      expect(getCookie('test')).toBe('value');
    });

    it('should handle cookies with special characters', () => {
      cookieStore = 'complex=%3D%26%25; simple=value';

      expect(getCookie('complex')).toBe('=&%');
      expect(getCookie('simple')).toBe('value');
    });
  });

  describe('setCookie', () => {
    it('should set a cookie with default expiration and path', () => {
      setCookie('test', 'value');

      expect(document.cookie).toContain('test=value');
      expect(document.cookie).toContain('expires=');
      expect(document.cookie).toContain('path=/');
    });

    it('should set a cookie with custom expiration in seconds', () => {
      const spy = jest.spyOn(document, 'cookie', 'set');

      setCookie('seconds', 'value', 's30');

      expect(spy).toHaveBeenCalled();
      const setCookieArg = spy.mock.calls[0][0];
      expect(setCookieArg).toContain('seconds=value');
      expect(setCookieArg).toContain('expires=');
    });

    it('should set a cookie with custom expiration in hours', () => {
      const spy = jest.spyOn(document, 'cookie', 'set');

      setCookie('hours', 'value', 'h2');

      expect(spy).toHaveBeenCalled();
      const setCookieArg = spy.mock.calls[0][0];
      expect(setCookieArg).toContain('hours=value');
      expect(setCookieArg).toContain('expires=');
    });

    it('should set a cookie with custom expiration in days', () => {
      const spy = jest.spyOn(document, 'cookie', 'set');

      setCookie('days', 'value', 'd7');

      expect(spy).toHaveBeenCalled();
      const setCookieArg = spy.mock.calls[0][0];
      expect(setCookieArg).toContain('days=value');
      expect(setCookieArg).toContain('expires=');
    });

    it('should set a cookie with custom domain and path', () => {
      const spy = jest.spyOn(document, 'cookie', 'set');

      setCookie('domain', 'value', 'd1', '.example.com', '/test');

      expect(spy).toHaveBeenCalled();
      const setCookieArg = spy.mock.calls[0][0];
      expect(setCookieArg).toContain('domain=value');
      expect(setCookieArg).toContain('domain=.example.com');
      expect(setCookieArg).toContain('path=/test');
    });
  });

  describe('delCookie', () => {
    it('should do nothing if cookie does not exist', () => {
      const spy = jest.spyOn(document, 'cookie', 'set');

      delCookie('nonexistent');

      // Should not attempt to set an expiration for a non-existent cookie
      expect(spy).not.toHaveBeenCalled();
    });

    it('should delete the cookie if it exists', () => {
      // Set up a cookie first
      cookieStore = 'toDelete=value';

      const spy = jest.spyOn(document, 'cookie', 'set');

      delCookie('toDelete');

      expect(spy).toHaveBeenCalled();
      const setCookieArg = spy.mock.calls[0][0];

      // Should contain the cookie name and an expiration date in the past
      expect(setCookieArg).toContain('toDelete=');
      expect(setCookieArg).toContain('expires=');
    });
  });
});
