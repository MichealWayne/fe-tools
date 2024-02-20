/* eslint-disable @typescript-eslint/no-array-constructor */
import {
  type,
  isUndefined,
  isArray,
  isString,
  isObject,
  isNumber,
  isFunction,
  isPrimitive,
  isDate,
  equals,
} from '../src/type';
import { isEmptyObj } from '../src/object';

describe('string test', () => {
  it('type()', async () => {
    // es5
    expect(type()).toEqual('Undefined');
    expect(type(undefined)).toEqual('Undefined');
    expect(type(null)).toEqual('Null');
    expect(type(true)).toEqual('Boolean');
    expect(type(false)).toEqual('Boolean');
    expect(type('a')).toEqual('String');
    expect(type('')).toEqual('String');
    expect(type(1)).toEqual('Number');
    expect(type(NaN)).toEqual('Number');
    expect(type(Infinity)).toEqual('Number');
    expect(type({ a: 1, b: '2' })).toEqual('Object');
    expect(type([])).toEqual('Array');
    expect(
      type(function () {
        return '';
      })
    ).toEqual('Function');
    expect(type(new Promise(() => ''))).toEqual('Promise');
    expect(type(new Date())).toEqual('Date');

    // es6
    expect(type(Symbol())).toEqual('Symbol');
    expect(type(new Set())).toEqual('Set');
    expect(type(new WeakSet())).toEqual('WeakSet');
    expect(type(new Map())).toEqual('Map');
    expect(type(new WeakMap())).toEqual('WeakMap');

    // es7
    // expect(type(1n)).toEqual('BigInt');
  });

  it('isArray()', async () => {
    expect(isArray([])).toEqual(true);
    expect(isArray(Array())).toEqual(true);
    expect(isArray(Array.from([1, 2, 3], x => x + x))).toEqual(true);
    expect(isArray(new Array())).toEqual(true);
    expect(isArray('1,2,3')).toEqual(false);
    expect(isArray(new Set())).toEqual(false);
    expect(isArray({ length: 0 })).toEqual(false);
    expect(isArray()).toEqual(false);
  });

  it('isArray() ES5', async () => {
    expect(isArray([])).toEqual(true);
    expect(isArray(Array())).toEqual(true);
    expect(isArray(Array.from([1, 2, 3], x => x + x))).toEqual(true);
    expect(isArray(new Array())).toEqual(true);
    expect(isArray('1,2,3')).toEqual(false);
    expect(isArray(new Set())).toEqual(false);
    expect(isArray({ length: 0 })).toEqual(false);
    expect(isArray()).toEqual(false);
  });

  it('isUndefined()', async () => {
    expect(isUndefined(undefined)).toEqual(true);
    expect(isUndefined()).toEqual(true);
    expect(isUndefined('')).toEqual(false);
    expect(isUndefined(null)).toEqual(false);
    expect(isUndefined(false)).toEqual(false);
    expect(isUndefined([])).toEqual(false);
    expect(isUndefined('1,2,3')).toEqual(false);
    expect(isUndefined(new Set())).toEqual(false);
    expect(isUndefined({ length: 0 })).toEqual(false);
  });

  it('isDate()', async () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate('2020-01-01')).toBe(false);
    expect(isDate(1577836800000)).toBe(false);
    expect(isDate(null)).toBe(false);
    expect(isDate(undefined)).toBe(false);
    expect(isDate(true)).toBe(false);
  });
  it('isString()', async () => {
    expect(isString('')).toEqual(true);
    expect(isString(String())).toEqual(true);
    expect(isString(String.fromCharCode(69))).toEqual(true);
    expect(isString(new String())).toEqual(false); // object
    expect(isString([1, 2, 3].toString())).toEqual(true);
    expect(isString(123)).toEqual(false);
    expect(isString(new Set())).toEqual(false);
    expect(isString()).toEqual(false);
    expect(isString(false)).toEqual(false);
    expect(isString(null)).toEqual(false);
    expect(isString(undefined)).toEqual(false);
  });

  it('isNumber()', async () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-1)).toBe(true);
    expect(isNumber(1.1)).toBe(true);
    expect(isNumber('1')).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(NaN)).toBe(false);
  });

  it('isObject()', async () => {
    expect(isObject({})).toEqual(true);
    expect(isObject(Object())).toEqual(true);
    expect(isObject(new Object())).toEqual(true);
    expect(isObject(class A {}.prototype)).toEqual(true);
    expect(isObject([1, 2, 3])).toEqual(false);
    expect(isObject(123)).toEqual(false);
    expect(isObject(null)).toEqual(false);
    expect(isObject(new Set())).toEqual(false);
    expect(isObject(new Map())).toEqual(false);
    expect(isObject()).toEqual(false);
    expect(isObject(false)).toEqual(false);
    expect(isObject(null)).toEqual(false);
    expect(isObject(undefined)).toEqual(false);
  });

  it('isFunction()', async () => {
    expect(isFunction(() => '')).toEqual(true);
    expect(isFunction(Function())).toEqual(true);
    expect(isFunction(new Function())).toEqual(true);
    expect(isFunction([1, 2, 3])).toEqual(false);
    expect(isFunction(123)).toEqual(false);
    expect(isFunction(null)).toEqual(false);
    expect(isFunction(new Set())).toEqual(false);
    expect(isFunction(new Map())).toEqual(false);
    expect(isFunction()).toEqual(false);
    expect(isFunction(false)).toEqual(false);
    expect(isFunction(null)).toEqual(false);
    expect(isFunction(undefined)).toEqual(false);
  });

  it('isPrimitive()', async () => {
    expect(isPrimitive(() => '')).toEqual(false);
    expect(isPrimitive()).toEqual(false);
    expect(
      isPrimitive({
        then: () => '',
      })
    ).toEqual(true); // PromiseLike
    expect(
      isPrimitive({
        then: () => '',
        catch: () => '',
      })
    ).toEqual(true); // PromiseLike
  });

  it('isEmptyObj()', async () => {
    expect(isEmptyObj({})).toEqual(true);
    expect(isEmptyObj({ a: 1 })).toEqual(false);
    expect(isEmptyObj(null)).toEqual(false);
    expect(isEmptyObj()).toEqual(false);
  });

  it('equals()', async () => {
    expect(equals(1, 1)).toEqual(true);
    expect(equals({ a: 1 }, { a: 1 })).toEqual(true);
    expect(equals({ a: 1 }, { a: 1, b: 2 })).toEqual(false);
    expect(equals({ a: 1 }, [1])).toEqual(false);
    expect(equals({ then: () => '' }, { then: () => '' })).toEqual(false);
    expect(equals(new Date(), new Date())).toEqual(true);
    expect(equals(null, undefined)).toEqual(false);
    expect(equals(Object, Array)).toEqual(false);
    expect(equals(null, null)).toEqual(true);
    expect(equals(Symbol(), Symbol())).toEqual(false);
    expect(equals({}, () => '')).toEqual(false);
    expect(equals(undefined, undefined)).toEqual(true);
    expect(equals(undefined, 0)).toEqual(false);
  });
});
