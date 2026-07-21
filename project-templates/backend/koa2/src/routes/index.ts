/**
 * @author Wayne
 * @Date 2023-02-15 15:18:59
 * @LastEditTime 2024-05-17 09:54:42
 */
import Router from '@koa/router';

import { HelloWorld, GetTest, PostTest } from '../controllers/api';
import healthRouter from './health';

const router = new Router();

router.use(healthRouter.routes(), healthRouter.allowedMethods());

router
  .get('/', HelloWorld)
  .get('/getTest', GetTest)
  .post('/postTest', PostTest);

export default router;
