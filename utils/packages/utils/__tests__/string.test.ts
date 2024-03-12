/**
 * @author Wayne
 * @Date 2023-02-15 14:06:30
 * @LastEditTime 2024-03-10 10:14:09
 */
import {
  byteSize,
  capitalize,
  capitalizeEveryWord,
  decapitalize,
  palindrome,
  stripHTMLTags,
  camelize,
  splitLines,
  isChinese,
  truncateString,
  fromCamelCase,
  reverseString,
} from '../src/string';

describe('string test', () => {
  it('byteSize()', async () => {
    expect(byteSize('Hello, world!')).toEqual(13);
    expect(byteSize('你好，世界！')).toEqual(14);
  });

  it('capitalize()', async () => {
    expect(capitalize('hello')).toEqual('Hello');
    expect(capitalize('world')).toEqual('World');
  });

  it('capitalizeEveryWord()', async () => {
    expect(capitalizeEveryWord('hello world')).toEqual('Hello World');
    expect(capitalizeEveryWord('the quick brown fox')).toEqual('The Quick Brown Fox');
  });

  it('decapitalize()', async () => {
    expect(decapitalize('Hello')).toEqual('hello');
    expect(decapitalize('World')).toEqual('world');
  });

  describe('reverseString', () => {
    it('should handle empty strings correctly', () => {
      const str = '';
      expect(reverseString(str)).toEqual('');
    });
  });

  describe('fromCamelCase', () => {
    it('should convert camel case to snake case with default separator', () => {
      const result = fromCamelCase('camelCaseString');
      expect(result).toBe('camel_case_string');
    });

    it('should convert camel case to kebab case with specified separator', () => {
      const result = fromCamelCase('camelCaseString', '-');
      expect(result).toBe('camel-case-string');
    });

    it('should handle empty input', () => {
      const result = fromCamelCase('');
      expect(result).toBe('');
    });
  });

  describe('palindrome', () => {
    it('should return true for a single word palindrome', () => {
      expect(palindrome('racecar')).toBeTruthy();
    });
    it('should return false for a single word non-palindrome', () => {
      expect(palindrome('hello')).toBeFalsy();
    });
  });

  describe('stripHTMLTags', () => {
    it('should remove HTML tags from a string', () => {
      const input = 'This is <b>bold</b> and <i>italic</i> text';
      const expectedOutput = 'This is bold and italic text';
      expect(stripHTMLTags(input)).toEqual(expectedOutput);
    });
  });

  it('camelize()', async () => {
    expect(camelize('')).toEqual('');
    expect(camelize('test-data')).toEqual('testData');
    expect(camelize('test-data-item')).toEqual('testDataItem');
    expect(camelize('test-data-item-1')).toEqual('testDataItem1');
    expect(camelize('test-data-item-1')).toEqual('testDataItem1');
    expect(camelize('aa-bb-cc')).toEqual('aaBbCc');
    expect(camelize('a-b-c')).toEqual('aBC');
    expect(camelize('a--b')).toEqual('a-B');
    expect(camelize('a-')).toEqual('a-');
    expect(camelize('a--')).toEqual('a--');
    expect(camelize('-')).toEqual('-');
    expect(camelize('--')).toEqual('--');
    expect(camelize('a')).toEqual('a');
  });

  it('splitLines()', async () => {
    it('should split lines of text with \\n', () => {
      const input = 'line 1\nline 2\nline 3\n';
      const expectedOutput = ['line 1', 'line 2', 'line 3', ''];
      expect(JSON.stringify(splitLines(input))).toEqual(JSON.stringify(expectedOutput));
    });

    it('should split lines of text with \\r\\n', () => {
      const input = 'line 1\r\nline 2\r\nline 3\r\n';
      const expectedOutput = ['line 1', 'line 2', 'line 3', ''];
      expect(JSON.stringify(splitLines(input))).toEqual(JSON.stringify(expectedOutput));
    });

    it('should split lines of text with mixed line endings', () => {
      const input = 'line 1\nline 2\r\nline 3\n\r';
      const expectedOutput = ['line 1', 'line 2', 'line 3', ''];
      expect(JSON.stringify(splitLines(input))).toEqual(JSON.stringify(expectedOutput));
    });

    it('should return an array with a single empty string for an empty input', () => {
      const input = '';
      const expectedOutput = [''];
      expect(JSON.stringify(splitLines(input))).toEqual(JSON.stringify(expectedOutput));
    });

    expect(JSON.stringify(splitLines(''))).toEqual(JSON.stringify(['']));
    expect(JSON.stringify(splitLines('123\r\n456'))).toEqual(JSON.stringify(['123', '456']));
    expect(JSON.stringify(splitLines('123\n456'))).toEqual(JSON.stringify(['123', '456']));
    expect(
      JSON.stringify(
        splitLines(`123
456`)
      )
    ).toEqual(JSON.stringify(['123', '456']));
  });

  it('isChinese()', async () => {
    expect(isChinese('前端')).toEqual(true);
    expect(isChinese('kingfisher')).toEqual(false);
    expect(isChinese('跨端kingfisher')).toEqual(false);
  });

  it('truncateString()', async () => {
    expect(truncateString('abcdefg', 3)).toEqual('abc...');
    expect(truncateString('abcdefg', 10)).toEqual('abcdefg');

    test('truncateString: truncate string when length > maxLen', () => {
      const result = truncateString('This is a long string that needs to be truncated.', 20);
      expect(result).toBe('This is a long strin...');
    });

    test('truncateString: return string when length <= maxLen', () => {
      const result = truncateString('This is a short string.', 30);
      expect(result).toBe('This is a short string.');
    });

    test('truncateString: return empty string when input is empty string', () => {
      const result = truncateString('', 10);
      expect(result).toBe('');
      expect(truncateString('hello world', 5)).toBe('hello...');
      expect(truncateString('hello world', 11)).toBe('hello world');
    });
  });
});
