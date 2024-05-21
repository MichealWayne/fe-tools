/**
 * @author Wayne
 * @Date 2023-02-15 15:18:59
 * @LastEditTime 2024-05-17 09:49:50
 */
import Koa from 'koa';

import { nextInstance } from '../types';

import { SERVER_NAME } from '../constant';

import logger from './logger';

/**
 * hello world(for healthy test)
 */
export const HelloWorld = async (ctx: Koa.BaseContext) => {
  ctx.body = `hello ${SERVER_NAME}.`;
};

export const GetTest = async (ctx: Koa.DefaultContext, next: nextInstance) => {
  ctx.body = {
    result: 'get',
    name: ctx.params.name,
    param: ctx.query,
  };
  if (ctx.params.prompt) logger.info(`${JSON.stringify(ctx.params)}`);
  next();
};

export const PostTest = async (ctx: Koa.DefaultContext, next: nextInstance) => {
  ctx.body = {
    result: 'post',
    name: ctx.params.name,
    param: ctx.request.body,
  };

  next();
};
