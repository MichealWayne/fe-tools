import { NOOP, each, cloneObjDeep, cloneArray, throwError } from '../src/utils/base';

describe('base utils', () => {
  it('NOOP should return empty string', () => {
    expect(NOOP()).toBe('');
  });

  it('each should iterate and return original array', () => {
    const arr = [1, 2, 3];
    const seen: number[] = [];
    const result = each(arr, (val: number) => seen.push(val));
    expect(seen).toEqual([1, 2, 3]);
    expect(result).toBe(arr);
  });

  it('cloneObjDeep should merge objects without overwriting truthy values', () => {
    const fromObj = { a: 1, b: { c: 2, d: 3 } };
    const toObj = { b: { c: 9 } };
    const result = cloneObjDeep(fromObj, toObj);
    expect(result).toEqual({ b: { c: 9, d: 3 }, a: 1 });
  });

  it('cloneObjDeep should return empty object for non-objects', () => {
    expect(cloneObjDeep(null as any, {})).toEqual({});
    expect(cloneObjDeep({}, null as any)).toEqual({});
  });

  it('cloneArray should copy values into target array', () => {
    const fromArr = [1, 2, 3];
    const target: number[] = [];
    const result = cloneArray(fromArr, target);
    expect(result).toBe(target);
    expect(result).toEqual([1, 2, 3]);
  });

  it('throwError should throw formatted error', () => {
    expect(() => throwError('oops', 'base', 'detail')).toThrow('Error!oops.(base detail)');
  });
});
