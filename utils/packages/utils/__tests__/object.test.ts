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

describe('object test', () => {
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

  it('should return an empty object when given an empty array', () => {
    const result = mapObject([], v => v);
    expect(result).toEqual({});
  });
  it('should apply the provided function to each element in the array and return a new object with the results', () => {
    const result = mapObject(['a', 'b', 'c'], v => v + '1');
    expect(result).toEqual({ a: 'a1', b: 'b1', c: 'c1' });
  });

  it('hasOwnProperty()', async () => {
    expect(hasOwnProperty({}, 'toString')).toEqual(false);
    expect(hasOwnProperty({ a: 1 }, 'a')).toEqual(true);
  });

  it('pick()', async () => {
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

  it('isEmptyObj()', async () => {
    expect(isEmptyObj({})).toEqual(true);
    expect(isEmptyObj({ a: 1 })).toEqual(false);
    expect(isEmptyObj(null)).toEqual(false);
    expect(isEmptyObj()).toEqual(false);
  });
});

describe('forOwn', () => {
  it('should call the provided function with each value and key in the object', () => {
    const obj = { a: 1, b: 2 };
    let result = 0;
    forOwn(obj, (value: any) => {
      result += value;
    });
    expect(result).toEqual(3);
  });

  it('should not modify the original object', () => {
    const obj: any = { a: 1, b: 2 };
    forOwn(obj, (value: any, key: any) => {
      obj[key] = obj[key] * 2;
    });
    expect(obj.a).toEqual(2); // The original object should remain unchanged
  });
});
