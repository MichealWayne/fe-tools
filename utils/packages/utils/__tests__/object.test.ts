/**
 * @author Wayne
 * @Date 2023-02-15 14:11:01
 * @LastEditTime 2024-03-10 13:21:04
 */
import { hasOwnProp, pick, isEmptyObj, forOwn } from '../src/object';

describe('object test', () => {
  it('hasOwnProp()', async () => {
    expect(hasOwnProp({}, 'toString')).toEqual(false);
    expect(hasOwnProp({ a: 1 }, 'a')).toEqual(true);
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
    forOwn(obj, (value: any, key: any) => {
      result += value + parseInt(key);
    });
    expect(result).toEqual(3 + 4); // 1+a + 2+b = 3+4
  });

  it('should not modify the original object', () => {
    const obj = { a: 1, b: 2 };
    forOwn(obj, (value: any, key: any) => {
      obj[key] *= 2;
    });
    expect(obj.a).toEqual(1); // The original object should remain unchanged
  });
});
