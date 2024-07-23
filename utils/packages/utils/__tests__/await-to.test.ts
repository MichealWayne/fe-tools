/**
 * @author Wayne
 * @Date 2024-07-22 19:36:46
 * @LastEditTime 2024-07-21 19:36:56
 */
import { to } from '../src/await-to';

describe('to', () => {
  it('should return a promise with [null, data] if the original promise resolves', async () => {
    const promise = Promise.resolve('data');
    const result = await to(promise);
    expect(result).toEqual([null, 'data']);
  });

  it('should return a promise with [error, undefined] if the original promise rejects', async () => {
    const error = new Error('Something went wrong');
    const promise = Promise.reject(error);
    const result = await to(promise);
    expect(result).toEqual([error, undefined]);
  });

  it('should return a promise with [parsedError, undefined] if errorExt is provided', async () => {
    const error = new Error('Something went wrong');
    const errorExt = { additionalInfo: 'Additional information' };
    const promise = Promise.reject(error);
    const result = await to(promise, errorExt);
    expect(result).toEqual([{ ...error, ...errorExt }, undefined]);
  });
});
