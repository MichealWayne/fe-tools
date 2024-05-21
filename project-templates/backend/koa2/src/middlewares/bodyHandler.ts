/**
 * @author Wayne
 * @Date 2023-05-09 20:38:53
 * @LastEditTime 2023-12-29 15:02:17
 */
import koaBody from 'koa-body';

import config from '../config';

const bodyHandler = koaBody({
  multipart: config.file.multipart,
  formidable: {
    maxFileSize: config.file.maxFileSize,
  },
});

export default bodyHandler;
