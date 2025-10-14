/**
 * @author Wayne
 */
import { join } from 'path';
const pkg = require(join(__dirname, '../package.json'));

export const LOG_INFO = {
  appenders: {
    console: {
      type: 'console',
    },
    trace: {
      type: 'dateFile',
      filename: './logs/access',
      pattern: '.yyyy.log',
      alwaysIncludePattern: true,
      'maxLogSize ': 204800,
    },
    http: {
      type: 'logLevelFilter',
      appender: 'trace',
      level: 'trace',
      maxLevel: 'trace',
    },
    info: {
      type: 'dateFile',
      filename: './logs/info',
      encoding: 'utf-8',
      pattern: '.yyyy.log',
      maxLogSize: 204800,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: '[%d{ISO8601}][%5p  %z  %c] %m',
      },
      compress: true,
    },
    maxInfo: {
      type: 'logLevelFilter',
      appender: 'info',
      level: 'debug',
      maxLevel: 'error',
    },
    error: {
      type: 'dateFile',
      filename: './logs/error',
      pattern: '.yyyy.log',
      maxLogSize: 204800,
      encoding: 'utf-8',
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: '[%d{ISO8601}][%5p  %z  %c] %m',
      },
      compress: true,
    },
    minError: {
      type: 'logLevelFilter',
      appender: 'error',
      level: 'error',
    },
  },
  categories: {
    default: {
      appenders: ['console', 'http', 'maxInfo', 'minError'],
      level: 'all',
    },
  },
};

export const isDev = process.env.NODE_ENV === 'development';

export default {
  port: pkg.port,
  isDev,
  file: {
    multipart: true,
    maxFileSize: 500 * 1024 * 1024,
  },
};
