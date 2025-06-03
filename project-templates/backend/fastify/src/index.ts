import 'reflect-metadata';
import fastify, { FastifyInstance } from 'fastify';
import os from 'os';

import { bootstrap } from './app';
import { config } from './config';
import { log } from './utils/logger';

// Log configuration
console.log(config);

// Handle uncaught exceptions
process.on('uncaughtException', error => {
  log.fatal('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  log.fatal('Unhandled Rejection at:', { promise, reason });
  process.exit(1);
});

// Handle process termination
process.on('SIGINT', () => {
  log.info('SIGINT received. Shutting down gracefully...');
  shutdown(0);
});

process.on('SIGTERM', () => {
  log.info('SIGTERM received. Shutting down gracefully...');
  shutdown(0);
});

// Graceful shutdown function
function shutdown(exitCode: number) {
  try {
    log.info('Shutting down application...');
    // Add any cleanup code here
    log.info('Application shutdown complete');
    process.exit(exitCode);
  } catch (error) {
    log.fatal('Error during shutdown', error);
    process.exit(1);
  }
}

const start = async () => {
  try {
    log.info('Starting application...');

    const app: FastifyInstance = fastify({
      // Disable Fastify's built-in logger in favor of log4js
      logger: false,
      disableRequestLogging: config.env === 'test',
      ignoreTrailingSlash: true,
      forceCloseConnections: true,
      connectionTimeout: 30000, // 30 seconds
      keepAliveTimeout: 5000, // 5 seconds
      pluginTimeout: 10000, // 10 seconds
    });

    // Initialize application
    await bootstrap(app);

    // Log all network interfaces
    const interfaces = os.networkInterfaces();
    log.info('Available Network Interfaces:');
    Object.entries(interfaces).forEach(([name, iface]) => {
      if (iface) {
        iface.forEach(details => {
          if (details.family === 'IPv4' && !details.internal) {
            log.info(`  ${name}: http://${details.address}:${config.port}`);
          }
        });
      }
    });

    // Start server
    const address = await app.listen({
      port: config.port,
      host: config.host,
      listenTextResolver: address => {
        return `Server is listening on ${address}`;
      },
    });

    log.info(`Server listening at ${address}`);
    log.info(`API Documentation available at ${address}${config.apiPrefix}/documentation`);
    log.info(`Health check: ${address}/health`);
    log.info('Ready to accept connections');

    return app;
  } catch (error) {
    log.fatal('Failed to start application', error);
    process.exit(1);
  }
};

// Only start the server if this file is run directly (not when imported for tests)
if (require.main === module) {
  start().catch(error => {
    log.fatal('Unhandled error in application', error);
    process.exit(1);
  });
}

export { start };
