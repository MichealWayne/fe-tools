/**
 * @author Wayne
 * @Date 2025-06-02 19:01:48
 * @LastEditTime 2025-06-02 19:04:19
 */

import { mkdirSync } from 'fs';
import path from 'path';
import log4js from 'log4js';

import { config } from '.';

// Ensure logs directory exists
const logsDir = path.join(process.cwd(), 'logs');
try {
  mkdirSync(logsDir, { recursive: true });
} catch (e) {
  console.error('Could not create logs directory!', e);
}

// Configure log4js
log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: {
      type: 'dateFile',
      filename: path.join(logsDir, 'app.log'),
      pattern: 'yyyy-MM-dd',
      keepFileExt: true,
      numBackups: 7,
      compress: true,
    },
    errorFile: {
      type: 'file',
      filename: path.join(logsDir, 'error.log'),
      maxLogSize: 10485760, // 10MB
      backups: 5,
      compress: true,
    },
    errors: {
      type: 'logLevelFilter',
      level: 'error',
      appender: 'errorFile',
    },
  },
  categories: {
    default: {
      appenders: ['console', 'file', 'errors'],
      level: config.logLevel,
    },
  },
});

export default log4js;
