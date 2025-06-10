/**
 * @author Wayne
 * @Date 2024-07-22 19:44:12
 * @LastEditTime 2025-06-09 19:18:48
 */
import {
  parseQueryString,
  getUrlParam,
  paramsJoinUrl,
  getBaseUrl,
  getUrlDomain,
  uniqueSlash,
} from '../src/url';
import { httpsRedirect } from '../src/navigate';

describe('parseQueryString', () => {
  it('should return an empty object if the URL has no query string', () => {
    const result = parseQueryString('https://github.com/');
    expect(result).toEqual({});
  });

  it('should parse the query string and return an object', () => {
    const result = parseQueryString('https://github.com/?a=1&b=sss');
    expect(result).toEqual({ a: '1', b: 'sss' });
  });

  it('should handle special characters in query string', () => {
    const result = parseQueryString('https://github.com/?name=John%20Doe&special=%26%3D%3F');
    expect(result).toEqual({ name: 'John Doe', special: '&=?' });
  });

  it('should handle empty values in query string', () => {
    const result = parseQueryString('https://github.com/?empty=&nonempty=value');
    expect(result).toEqual({ empty: '', nonempty: 'value' });
  });

  it('should use current URL if no URL is provided', () => {
    // Save original location
    const originalLocation = window.location;

    // Mock window.location
    delete (window as any).location;
    Object.defineProperty(window, 'location', {
      value: { href: 'https://example.com/?test=mock' },
      writable: true,
    });

    const result = parseQueryString();
    expect(result).toEqual({ test: 'mock' });

    // Restore original location
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
    });
  });
});

describe('getUrlParam', () => {
  beforeEach(() => {
    // Mock window.location for each test
    delete (window as any).location;
    Object.defineProperty(window, 'location', {
      value: { search: '?name=John%20Doe&age=30&empty=' },
      writable: true,
    });
  });

  it('should return null if the query parameter is not found', () => {
    const result = getUrlParam('nonexistent');
    expect(result).toBeNull();
  });

  it('should return the decoded value of the query parameter', () => {
    const result = getUrlParam('name');
    expect(result).toBe('John Doe');
  });

  it('should handle empty parameter values', () => {
    const result = getUrlParam('empty');
    expect(result).toBe('');
  });

  it('should use custom decoder if provided', () => {
    const customDecoder = (s: string) => `Custom decoded: ${s}`;
    const result = getUrlParam('age', customDecoder);
    expect(result).toBe('Custom decoded: 30');
  });
});

describe('paramsJoinUrl', () => {
  it('should return an empty string if the params object is empty', () => {
    const result = paramsJoinUrl({});
    expect(result).toBe('');
  });

  it('should join the params object into a URL-encoded string', () => {
    const result = paramsJoinUrl({ age: '25', city: 'New York' });
    expect(result).toBe('age%3D25%26city%3DNew%20York');
  });

  it('should handle special characters in parameter values', () => {
    const result = paramsJoinUrl({ q: 'search query & more', filter: 'name=value' });
    expect(decodeURIComponent(result)).toBe('q=search query & more&filter=name=value');
  });

  it('should handle empty parameter values', () => {
    const result = paramsJoinUrl({ empty: '', nonempty: 'value' });
    expect(decodeURIComponent(result)).toBe('empty=&nonempty=value');
  });
});

describe('getBaseUrl', () => {
  it('should return the original URL if it does not contain a query string', () => {
    const result = getBaseUrl('https://example.com/');
    expect(result).toBe('https://example.com/');
  });

  it('should return the URL without the query string', () => {
    const result = getBaseUrl('https://example.com/page.html?query=string');
    expect(result).toBe('https://example.com/page.html');
  });

  it('should handle URLs with hash fragments', () => {
    const result = getBaseUrl('https://example.com/page.html?query=string#section');
    expect(result).toBe('https://example.com/page.html');
  });

  it('should use current URL if no URL is provided', () => {
    // Save original location
    const originalLocation = window.location;

    // Mock window.location
    delete (window as any).location;
    Object.defineProperty(window, 'location', {
      value: { href: 'https://example.com/default?test=mock' },
      writable: true,
    });

    const result = getBaseUrl();
    expect(result).toBe('https://example.com/default');

    // Restore original location
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
    });
  });
});

describe('getUrlDomain', () => {
  it('should return the domain from the URL', () => {
    const result = getUrlDomain('https://example.com/page.html?query=string');
    expect(result).toBe('https://example.com');
  });

  it('should handle URLs with subdomains', () => {
    const result = getUrlDomain('https://sub.example.com/path');
    expect(result).toBe('https://sub.example.com');
  });

  it('should handle URLs with ports', () => {
    const result = getUrlDomain('https://example.com:8080/path');
    expect(result).toBe('https://example.com:8080');
  });

  it('should return empty string for invalid URLs', () => {
    const result = getUrlDomain('invalid-url');
    expect(result).toBe('');
  });

  it('should use current URL if no URL is provided', () => {
    // Save original location
    const originalLocation = window.location;

    // Mock window.location
    delete (window as any).location;
    Object.defineProperty(window, 'location', {
      value: { href: 'https://test.domain.com/path?query=1' },
      writable: true,
    });

    const result = getUrlDomain();
    expect(result).toBe('https://test.domain.com');

    // Restore original location
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
    });
  });
});

describe('httpsRedirect', () => {
  it('should not redirect if the URL already starts with "https://"', () => {
    const replaceMock = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { href: 'https://example.com', replace: replaceMock },
    });
    httpsRedirect('https://example.com');
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it('should redirect to the HTTPS version of the URL', () => {
    const replaceMock = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { href: 'http://example.com', replace: replaceMock },
    });
    httpsRedirect('http://example.com');
    expect(replaceMock).toHaveBeenCalledWith('https://example.com');
  });

  it('should preserve path, query parameters, and hash in redirect', () => {
    const replaceMock = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { href: 'http://example.com', replace: replaceMock },
    });
    httpsRedirect('http://example.com/path?query=1#hash');
    expect(replaceMock).toHaveBeenCalledWith('https://example.com/path?query=1#hash');
  });
});

describe('uniqueSlash', () => {
  it('should replace consecutive slashes with a single slash in the path', () => {
    const result = uniqueSlash('http://www.example.com//foo//bar');
    expect(result).toBe('http://www.example.com/foo/bar');
  });

  it('should preserve the http:// or https:// protocol prefix', () => {
    const result1 = uniqueSlash('http://example.com/path');
    expect(result1).toBe('http://example.com/path');

    const result2 = uniqueSlash('https://example.com/path');
    expect(result2).toBe('https://example.com/path');
  });

  it('should handle multiple consecutive slashes', () => {
    const result = uniqueSlash('http://example.com///path////to//////resource');
    expect(result).toBe('http://example.com/path/to/resource');
  });

  it('should handle trailing slashes', () => {
    const result = uniqueSlash('http://example.com/path//');
    expect(result).toBe('http://example.com/path/');
  });
});
