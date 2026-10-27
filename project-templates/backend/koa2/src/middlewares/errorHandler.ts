/**
 * @author Wayne
 * @Date 2023-02-15 15:18:59
 * @LastEditTime 2024-05-17 09:49:11
 */

import Koa from 'koa';
import logger from '../controllers/logger';
import json from '../utils/json';

// Error handler for Koa requests and body-parser failures.
// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async (ctx: Koa.BaseContext, next: () => Promise<any>) => {
  try {
    await next();
  } catch (e) {
    const error = e as { status?: unknown; statusCode?: unknown; message?: unknown; msg?: unknown };
    const candidateStatus = Number(error?.status ?? error?.statusCode);
    const status =
      Number.isInteger(candidateStatus) && candidateStatus >= 400 && candidateStatus <= 599
        ? candidateStatus
        : 500;
    const message =
      typeof error?.message === 'string'
        ? error.message
        : typeof error?.msg === 'string'
          ? error.msg
          : 'Request failed';
    const msg = status < 500 ? message : 'Internal Server Error';
    logger.error(
      'Request failed',
      e instanceof Error ? e.stack || e.message : String(e)
    );
    ctx.status = status;
    json(ctx, {
      success: false,
      msg,
    });
  }
};
