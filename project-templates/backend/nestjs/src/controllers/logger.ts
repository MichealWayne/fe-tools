/**
 * @author Wayne
 */
import log4js from 'log4js';
import { LOG_METHODS } from '../constant';
import { LOG_INFO, isDev } from '../config';

log4js.configure(LOG_INFO);
const _logger: any = log4js.getLogger('index');

const _logHoc =
  (method: string) =>
  (info: string, ...args: any[]) => {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.log(info, ...args);
    }
    _logger[method](info, ...args);
  };

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const logger: any = {};
LOG_METHODS.forEach((method: string) => {
  logger[method] = _logHoc(method);
});

export default logger;
