/**
 * @author Wayne
 * @Date 2023-02-15 15:18:59
 * @LastEditTime 2023-05-09 15:47:20
 */
import Koa from 'koa';

export default (ctx: Koa.BaseContext | Koa.DefaultContext, returnData: Object = {}) => {
  ctx.type = 'application/json';
  const newReturn = Object.assign(
    {
      success: true,
      msg: 'ok',
      data: {},
    },
    returnData
  );
  ctx.body = JSON.stringify(newReturn);
};
