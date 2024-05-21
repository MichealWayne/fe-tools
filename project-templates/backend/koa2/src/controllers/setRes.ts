/**
 * @author Wayne
 * @Date 2023-02-15 15:18:59
 * @LastEditTime 2023-05-19 15:51:42
 */
import Koa from 'koa';
import { CODE_NAME, MESSAGE_NAME, SUCCESS_CODE, ERROR_CODE } from '../constant';

export function sendSuccess(res: Koa.DefaultContext, extobj = {}) {
  const resObj = {
    [CODE_NAME]: SUCCESS_CODE,
    [MESSAGE_NAME]: 'success',
    ...extobj,
  };

  res.body = resObj;
  return resObj;
}

export function sendFail(res: Koa.DefaultContext, extobj = {}) {
  const resObj = {
    [CODE_NAME]: ERROR_CODE,
    [MESSAGE_NAME]: 'fail',
    ...extobj,
  };

  res.body = resObj;
  return resObj;
}
