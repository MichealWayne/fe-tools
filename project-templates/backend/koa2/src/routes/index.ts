/**
 * @author Wayne
 * @Date 2023-02-15 15:18:59
 * @LastEditTime 2024-05-17 09:54:42
 */
import Router from 'koa-router';

import { HelloWorld, GetTest, PostTest } from '../controllers/api';

const router = new Router();

router
  .get('/', HelloWorld)
  .get('/readiness', HelloWorld)
  .get('/getTest', GetTest)
  .post('/postTest', PostTest);

export default router;
