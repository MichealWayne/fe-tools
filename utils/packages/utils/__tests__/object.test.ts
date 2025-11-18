/**
 * @author Wayne
 * @Date 2023-02-15 14:11:01
 * @LastEditTime 2024-03-26 09:55:29
 */
import {
  objectFromPairs,
  mapObject,
  hasOwnProperty,
  pick,
  isEmptyObj,
  forOwn,
} from '../src/object';

describe('objectFromPairs', () => {
  it('should convert an array of pairs to an object', () => {
    const result = objectFromPairs([
      ['name', 'John'],
      ['age', 30],
      ['isMarried', true],
    ]);
    expect(result).toEqual({ name: 'John', age: 30, isMarried: true });
  });

  it('should handle empty input', () => {
    const result = objectFromPairs([]);
    expect(result).toEqual({});
  });

  it('should handle complex values', () => {
    const result = objectFromPairs([
      ['a', 1],
      ['b', [2, 3]],
      ['c', { d: 4 }],
    ]);
    expect(result).toEqual({ a: 1, b: [2, 3], c: { d: 4 } });
  });

  it('should handle different value types', () => {
    const result = objectFromPairs([
      ['string', 'hello'],
      ['number', 42],
      ['boolean', true],
      ['null', null],
      ['undefined', undefined],
    ]);
    expect(result).toEqual({
      string: 'hello',
      number: 42,
      boolean: true,
      null: null,
      undefined: undefined,
    });
  });

  it('should overwrite duplicate keys', () => {
    const result = objectFromPairs([
      ['a', 1],
      ['b', 2],
      ['a', 3],
    ]);
    expect(result).toEqual({ a: 3, b: 2 });
  });
});

describe('mapObject', () => {
  it('should return an empty object when given an empty array', () => {
    const result = mapObject([], v => v);
    expect(result).toEqual({});
  });

  it('should apply the provided function to each element in the array and return a new object with the results', () => {
    const result = mapObject(['a', 'b', 'c'], v => v + '1');
    expect(result).toEqual({ a: 'a1', b: 'b1', c: 'c1' });
  });

  it('should use index parameter', () => {
    const result = mapObject(['a', 'b', 'c'], (v, i) => i);
    expect(result).toEqual({ a: 0, b: 1, c: 2 });
  });

  it('should use array parameter', () => {
    const result = mapObject(['a', 'b'], (v, i, arr) => arr.length - i);
    expect(result).toEqual({ a: 2, b: 1 });
  });

  it('should handle complex transformations', () => {
    const result = mapObject(['apple', 'banana'], v => ({
      name: v,
      length: v.length,
    }));
    expect(result.apple).toEqual({ name: 'apple', length: 5 });
    expect(result.banana).toEqual({ name: 'banana', length: 6 });
  });

  it('should handle single element', () => {
    const result = mapObject(['single'], v => v);
    expect(result).toEqual({ single: 'single' });
  });
});

describe('hasOwnProperty', () => {
  it('should return true for own properties', () => {
    const obj = { a: 1, b: 2 };
    expect(hasOwnProperty(obj, 'a')).toBe(true);
    expect(hasOwnProperty(obj, 'b')).toBe(true);
  });

  it('should return false for inherited properties', () => {
    expect(hasOwnProperty({}, 'toString')).toBe(false);
    expect(hasOwnProperty({ a: 1 }, 'hasOwnProperty')).toBe(false);
  });

  it('should return false for non-existent properties', () => {
    expect(hasOwnProperty({ a: 1 }, 'c')).toBe(false);
  });

  it('should handle different property types', () => {
    const obj: any = {
      string: 'value',
      number: 42,
      boolean: true,
      null: null,
      undefined: undefined,
      0: 'numeric key',
      '': 'empty string key',
    };
    expect(hasOwnProperty(obj, 'string')).toBe(true);
    expect(hasOwnProperty(obj, 'undefined')).toBe(true);
    expect(hasOwnProperty(obj, 0)).toBe(true);
    expect(hasOwnProperty(obj, '')).toBe(true);
  });

  it('should handle symbol keys', () => {
    const sym = Symbol('test');
    const obj = { [sym]: 'symbol value', regular: 'regular value' };
    expect(hasOwnProperty(obj, sym)).toBe(true);
    expect(hasOwnProperty(obj, 'regular')).toBe(true);
  });

  it('should be safe alternative to obj.hasOwnProperty()', () => {
    const maliciousObj: any = { hasOwnProperty: 'not a function', a: 1 };
    expect(hasOwnProperty(maliciousObj, 'a')).toBe(true);
  });

  it('should handle edge cases', () => {
    expect(hasOwnProperty({}, 'anything')).toBe(false);
    expect(hasOwnProperty({ a: undefined }, 'a')).toBe(true);
  });
});

describe('pick', () => {
  it('should pick specified properties from object', () => {
    const testObj1 = {
      a: 1,
      b: 2,
      c: 3,
    };
    const pickObj1 = pick(testObj1, ['a']);
    expect(pickObj1.b).toBe(undefined);
    expect(pickObj1.a).toBe(1);
    expect(testObj1.b).toBe(2);
  });

  it('should pick multiple properties', () => {
    const result = pick({ a: 1, b: 2, c: 3 }, ['a', 'b']);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should ignore non-existent keys', () => {
    const result = pick({ a: 1, b: 2, c: 3 }, ['a', 'd'] as any);
    expect(result).toEqual({ a: 1 });
  });

  it('should return empty object when picking non-existent keys', () => {
    const result = pick({ x: 10 }, ['y', 'z'] as any);
    expect(result).toEqual({});
  });

  it('should handle edge cases', () => {
    expect(pick({}, ['a', 'b'])).toEqual({});
    expect(pick({ a: 1, b: 2 }, [])).toEqual({});
  });

  it('should pick properties with undefined and null values', () => {
    const result = pick({ a: undefined, b: null }, ['a', 'b']);
    expect(result).toEqual({ a: undefined, b: null });
  });

  it('should perform shallow copy', () => {
    const source = {
      simple: 'value',
      array: [1, 2, 3],
      object: { nested: true },
      unused: 'ignored',
    };
    const result = pick(source, ['simple', 'array', 'object']);
    expect(result).toEqual({
      simple: 'value',
      array: [1, 2, 3],
      object: { nested: true },
    });
    // Verify shallow copy (same references)
    expect(result.array).toBe(source.array);
    expect(result.object).toBe(source.object);
  });
});

describe('isEmptyObj', () => {
  it('should return true for empty objects', () => {
    expect(isEmptyObj({})).toBe(true);
    expect(isEmptyObj(new Object())).toBe(true);
  });

  it('should return false for non-empty objects', () => {
    expect(isEmptyObj({ a: 1 })).toBe(false);
    expect(isEmptyObj({ a: undefined })).toBe(false);
    expect(isEmptyObj({ 0: 'value' })).toBe(false);
  });

  it('should return false for non-objects', () => {
    expect(isEmptyObj(null)).toBe(false);
    expect(isEmptyObj(undefined)).toBe(false);
    expect(isEmptyObj('')).toBe(false);
    expect(isEmptyObj([])).toBe(false);
    expect(isEmptyObj(0)).toBe(false);
    expect(isEmptyObj(false)).toBe(false);
  });

  it('should return true for objects with only inherited properties', () => {
    const obj = Object.create({ inherited: 'value' });
    expect(isEmptyObj(obj)).toBe(true);
  });

  it('should handle undefined parameter', () => {
    expect(isEmptyObj()).toBe(false);
  });
});

describe('forOwn', () => {
  it('should call the provided function with each value and key in the object', () => {
    const obj = { a: 1, b: 2 };
    let result = 0;
    forOwn(obj, (value: any) => {
      result += value;
    });
    expect(result).toBe(3);
  });

  it('should modify the original object when callback modifies it', () => {
    const obj: any = { a: 1, b: 2 };
    forOwn(obj, (value: any, key: any) => {
      obj[key] = obj[key] * 2;
    });
    expect(obj.a).toBe(2);
    expect(obj.b).toBe(4);
  });

  it('should iterate over all enumerable own properties', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const keys: string[] = [];
    const values: number[] = [];
    forOwn(obj, (val: any, key: any) => {
      keys.push(key);
      values.push(val);
    });
    expect(keys).toEqual(['a', 'b', 'c']);
    expect(values).toEqual([1, 2, 3]);
  });

  it('should work with all callback parameters', () => {
    const obj = { name: 'John', age: 30 };
    const results: any[] = [];
    forOwn(obj, (val, key, o) => {
      results.push({
        value: val,
        key: key,
        objKeysLength: Object.keys(o!).length,
      });
    });
    expect(results).toHaveLength(2);
    expect(results[0].objKeysLength).toBe(2);
  });

  it('should handle empty object', () => {
    let called = false;
    forOwn({}, () => {
      called = true;
    });
    expect(called).toBe(false);
  });

  it('should handle objects with undefined and null values', () => {
    const obj = { a: undefined, b: null };
    const values: any[] = [];
    forOwn(obj, (val) => values.push(val));
    expect(values).toEqual([undefined, null]);
  });
});
