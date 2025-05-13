/**
 * @author Wayne
 * @Date 2024-07-22 19:44:12
 * @LastEditTime 2025-05-11 19:49:35
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
});

describe('getUrlParam', () => {
  it('should return null if the query parameter is not found', () => {
    const result = getUrlParam('name');
    expect(result).toBeNull();
  });

  it('should return the decoded value of the query parameter', () => {
    const result = getUrlParam('name', decodeURIComponent);
    expect(result).toBe('John Doe');
  });
});

describe('paramsJoinUrl', () => {
  it('should return an empty string if the params object is empty', () => {
    const result = paramsJoinUrl({});
    expect(result).toBe('');
  });

  it('should join the params object into a URL-encoded string', () => {
    const result = paramsJoinUrl({ age: '25', city: 'New York' });
    expect(result).toBe('age=25&city=New%20York');
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
});

describe('getUrlDomain', () => {
  it('should return the domain from the URL', () => {
    const result = getUrlDomain('https://example.com/page.html?query=string');
    expect(result).toBe('https://example.com');
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
});

describe('uniqueSlash', () => {
  it('should replace consecutive slashes with a single slash in the path', () => {
    const result = uniqueSlash('http://www.example.com//foo//bar');
    expect(result).toBe('http://www.example.com/foo/bar');
  });
});
