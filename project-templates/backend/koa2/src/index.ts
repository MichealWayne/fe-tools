/**
 * @author Wayne
 * @Date 2023-02-15 15:18:59
 * @LastEditTime 2024-05-17 09:51:06
 */
import Koa from 'koa';
// import cors from 'koa2-cors'; 跨域处理，只有必要时开启

import { SERVER_NAME } from './constant';

import config from './config';
import logger from './controllers/logger';

import bodyHandler from './middlewares/bodyHandler';
import errorHandler from './middlewares/errorHandler';

import router from './routes';

const app = new Koa();

app.use(bodyHandler);
app.use(errorHandler);
// app.use(cors());

app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port, () => {
  logger.info(new Date().toLocaleString());
  logger.info(`Service Loaded(${SERVER_NAME})`);
  logger.info('Port', config.port);
});

app.on('error', (err, ctx) => {
  logger.error('server error', err, ctx);
});
