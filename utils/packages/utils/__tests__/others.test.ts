/**
 * @author Wayne
 * @Date 2023-02-07 09:56:41
 * @LastEditTime 2024-02-20 11:18:19
 */
import { compareVersion, digitUppercase } from '../src/others';

describe('compareVersion', () => {
  it('should compare versions correctly', () => {
    expect(compareVersion('1.1.8', '1.0.4')).toEqual(1);
    expect(compareVersion('1.0.2', '1.0.2')).toEqual(0);
    expect(compareVersion('2.0', '2.0.0')).toEqual(0);
    expect(compareVersion('3.0.1', '3.0.0.2')).toEqual(1);
    expect(compareVersion('1.1.1', '1.2.3')).toEqual(-1);
  });

  it('should handle different version lengths', () => {
    expect(compareVersion('1.0', '1.0.0')).toEqual(0);
    expect(compareVersion('1', '1.0.0')).toEqual(0);
    expect(compareVersion('2.0.1', '2.0')).toEqual(1);
    expect(compareVersion('1.0', '1.0.1')).toEqual(-1);
  });

  it('should handle edge cases', () => {
    expect(compareVersion('0.0.1', '0.0.1')).toEqual(0);
    expect(compareVersion('0.0.0', '0.0.1')).toEqual(-1);
    expect(compareVersion('10.0.0', '9.9.9')).toEqual(1);
  });

  it('should handle multi-digit version numbers', () => {
    expect(compareVersion('1.10.0', '1.9.0')).toEqual(1);
    expect(compareVersion('1.100.0', '1.99.0')).toEqual(1);
  });
});

describe('digitUppercase', () => {
  it('should convert positive integers correctly', () => {
    expect(digitUppercase(1000)).toEqual('壹仟元整');
    expect(digitUppercase(100)).toEqual('壹佰元整');
    expect(digitUppercase(10)).toEqual('壹拾元整');
    expect(digitUppercase(1)).toEqual('壹元整');
  });

  it('should convert negative numbers correctly', () => {
    expect(digitUppercase(-123.45)).toEqual('欠壹佰贰拾叁元肆角伍分');
    expect(digitUppercase(-100)).toEqual('欠壹佰元整');
    expect(digitUppercase(-1.5)).toEqual('欠壹元伍角');
  });

  it('should handle decimal numbers', () => {
    expect(digitUppercase(123.45)).toEqual('壹佰贰拾叁元肆角伍分');
    expect(digitUppercase(0.5)).toEqual('伍角');
    expect(digitUppercase(0.05)).toEqual('伍分');
    expect(digitUppercase(1.1)).toEqual('壹元壹角');
    expect(digitUppercase(1.01)).toEqual('壹元壹分');
  });

  it('should handle zero', () => {
    expect(digitUppercase(0)).toEqual('整');
  });

  it('should handle large numbers', () => {
    expect(digitUppercase(10000)).toEqual('壹万元整');
    expect(digitUppercase(100000000)).toEqual('壹亿元整');
    expect(digitUppercase(12345.67)).toContain('壹万');
  });

  it('should round cents properly', () => {
    expect(digitUppercase(1.234)).toEqual('壹元贰角叁分'); // rounds to 1.23
    expect(digitUppercase(1.235)).toEqual('壹元贰角肆分'); // rounds to 1.24
  });
});
