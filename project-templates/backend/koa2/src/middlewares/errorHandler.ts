/**
 * @author Wayne
 * @Date 2023-02-15 15:18:59
 * @LastEditTime 2024-05-17 09:49:11
 */

import Koa from 'koa';
import logger from '../controllers/logger';
import json from '../utils/json';

// Error Handler middleware For Koa2
// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async (ctx: Koa.BaseContext, next: () => Promise<any>) => {
  try {
    await next();
  } catch (e) {
    console.error(e);
    // Unknown Exception
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    const msg = (e as Error).message || (e as any).msg || 'Unknown Internal Server Error';
    logger.error(msg);
    json(ctx, {
      success: false,
      msg,
    });
  }
};
