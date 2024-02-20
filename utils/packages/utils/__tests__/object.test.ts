/**
 * @author Wayne
 * @Date 2023-02-15 14:11:01
 * @LastEditTime 2023-02-15 14:13:39
 */
import { hasOwnProp, pick, isEmptyObj } from '../src/object';

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
