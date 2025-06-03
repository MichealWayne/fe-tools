/**
 * @author Wayne
 * @Date 2025-06-02 14:29:23
 * @LastEditTime 2025-06-03 19:09:54
 */
import log4js from '../config/loggerConfig';

const logger = log4js.getLogger();

const log = {
  trace: (message: string, ...args: any[]): void => logger.trace(message, ...args),
  debug: (message: string, ...args: any[]): void => logger.debug(message, ...args),
  info: (message: string, ...args: any[]): void => logger.info(message, ...args),
  warn: (message: string, ...args: any[]): void => logger.warn(message, ...args),
  error: (message: string, ...args: any[]): void => logger.error(message, ...args),
  fatal: (message: string, ...args: any[]): void => logger.fatal(message, ...args),

  http: log4js.connectLogger(log4js.getLogger('http'), {
    level: 'auto',
  }),

  shutdown: (callback?: (error?: Error) => void): void => {
    log4js.shutdown(callback);
  },
};

export { log, logger };
export type { Logger } from 'log4js';
