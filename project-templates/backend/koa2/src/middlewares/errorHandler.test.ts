import Koa from 'koa';
import { describe, expect, it, jest } from '@jest/globals';

import errorHandler from './errorHandler';

jest.mock('../controllers/logger', () => ({
  __esModule: true,
  default: { error: jest.fn() },
}));

describe('Koa error handler', () => {
  const createContext = () => ({
    status: 200,
    type: '',
    body: '',
  }) as unknown as Koa.BaseContext;

  it('preserves client error status and message', async () => {
    const ctx = createContext();

    await errorHandler(ctx, async () => {
      throw Object.assign(new Error('invalid request'), { status: 400 });
    });

    expect(ctx.status).toBe(400);
    expect(JSON.parse(ctx.body as string)).toEqual({
      success: false,
      msg: 'invalid request',
      data: {},
    });
  });

  it('hides internal error details from 5xx responses', async () => {
    const ctx = createContext();

    await errorHandler(ctx, async () => {
      throw new Error('database password should not be returned');
    });

    expect(ctx.status).toBe(500);
    expect(JSON.parse(ctx.body as string)).toEqual({
      success: false,
      msg: 'Internal Server Error',
      data: {},
    });
  });
});
