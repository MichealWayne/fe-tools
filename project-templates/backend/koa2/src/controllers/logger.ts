/**
 * @author Wayne
 * @Date 2023-02-15 15:18:59
 * @LastEditTime 2023-06-25 13:37:59
 */
import log4js from 'log4js';

import { LOG_METHODS } from '../constant';
import { globalLog } from '../types';
import { LOG_INFO, isDev } from '../config';

log4js.configure(LOG_INFO);
const _logger: any = log4js.getLogger('index');

const _logHoc =
  (method: string) =>
  (info: string, ...args: string[]) => {
    if (isDev) {
      console.log(info, ...args);
    }
    _logger[method](info, ...args);
  };

const logger: globalLog = {};
LOG_METHODS.forEach((method: string) => {
  logger[method] = _logHoc(method);
});

export default logger;
