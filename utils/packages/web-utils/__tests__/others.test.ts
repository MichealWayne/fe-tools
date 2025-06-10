/**
 * @author Wayne
 * @Date 2025-06-08 17:15:09
 * @LastEditTime 2025-06-08 10:30:00
 */
import { isBase64 } from '../src/others';

describe('isBase64', () => {
  it('should return true if the string is base64', () => {
    // 标准Base64编码的字符串
    expect(isBase64('SGVsbG8gV29ybGQ=')).toBe(true);

    // 空白应该被忽略
    expect(isBase64('SGVsbG8gV29ybGQ= ')).toBe(true);

    // 另一个有效的Base64字符串
    expect(isBase64('dGVzdA==')).toBe(true); // "test"

    // 带填充的Base64字符串
    expect(isBase64('YQ==')).toBe(true); // "a"
    expect(isBase64('YWI=')).toBe(true); // "ab"

    // 更复杂的Base64字符串
    const complexBase64 = btoa(JSON.stringify({ name: 'test', value: 123 }));
    expect(isBase64(complexBase64)).toBe(true);
  });

  it('should return false if the string is not base64', () => {
    // 缺少填充的Base64字符串
    expect(isBase64('SGVsbG8gV29ybGQ')).toBe(false);

    // 包含非Base64字符的字符串
    expect(isBase64('SGVsbG8gV29ybGQ!=')).toBe(false);
    expect(isBase64('不是Base64')).toBe(false);

    // 长度不符合Base64规则的字符串
    expect(isBase64('a')).toBe(false);
    expect(isBase64('ab')).toBe(false);
    expect(isBase64('abc')).toBe(false);
  });

  it('should return false if the string is empty', () => {
    expect(isBase64('')).toBe(false);
    expect(isBase64('   ')).toBe(false);
    expect(isBase64(null as any)).toBe(false);
    expect(isBase64(undefined as any)).toBe(false);
  });

  it('should handle special cases', () => {
    // 模拟btoa和atob异常
    const originalBtoa = global.btoa;
    const originalAtob = global.atob;

    // 模拟btoa抛出异常
    global.btoa = jest.fn().mockImplementation(() => {
      throw new Error('btoa error');
    });

    expect(isBase64('SGVsbG8gV29ybGQ=')).toBe(false);

    // 恢复原始函数
    global.btoa = originalBtoa;
    global.atob = originalAtob;

    // 非标准的字符串（即使是有效的Base64格式也不一定是Base64编码）
    // 例如，字符串"base64"本身也是有效的Base64格式，但解码后得到的结果与原始字符串不同
    expect(isBase64('base64')).toBe(false);
  });
});
