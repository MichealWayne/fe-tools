/**
 * @author Wayne
 * @Date 2023-02-15 14:06:30
 * @LastEditTime 2024-02-20 10:52:18
 */
import { camelize, splitLines, isChinese, truncateString } from '../src/string';

describe('string test', () => {
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
      expect(splitLines(input)).toEqual(expectedOutput);
    });

    it('should split lines of text with \\r\\n', () => {
      const input = 'line 1\r\nline 2\r\nline 3\r\n';
      const expectedOutput = ['line 1', 'line 2', 'line 3', ''];
      expect(splitLines(input)).toEqual(expectedOutput);
    });

    it('should split lines of text with mixed line endings', () => {
      const input = 'line 1\nline 2\r\nline 3\n\r';
      const expectedOutput = ['line 1', 'line 2', 'line 3', ''];
      expect(splitLines(input)).toEqual(expectedOutput);
    });

    it('should return an array with a single empty string for an empty input', () => {
      const input = '';
      const expectedOutput = [''];
      expect(splitLines(input)).toEqual(expectedOutput);
    });

    expect(splitLines('')).toEqual(['']);
    expect(splitLines('123\r\n456')).toEqual(['123', '456']);
    expect(splitLines('123\n456')).toEqual(['123', '456']);
    expect(
      splitLines(`123
456`)
    ).toEqual(['123', '456']);
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
