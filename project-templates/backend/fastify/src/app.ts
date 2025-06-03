/**
 * @author Wayne
 * @Date 2025-06-02 14:16:49
 * @LastEditTime 2025-06-02 19:03:09
 */
import { FastifyInstance, FastifyServerOptions, FastifyError } from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import fastifyCors from '@fastify/cors';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

import { config } from './config';
import { registerRoutes } from './routes';
import { log } from './utils/logger';

type ErrorResponse = {
  statusCode: number;
  error: string;
  message: string;
  stack?: string;
  [key: string]: unknown;
};

const swaggerConfig = {
  openapi: {
    info: {
      title: 'Fastify API',
      description: 'Fastify API documentation',
      version: '1.0.0',
    },
    tags: [
      { name: 'health', description: 'Health check endpoints' },
      { name: 'users', description: 'User management endpoints' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http' as const,
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
};

const swaggerUiConfig = {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'list' as const, // Add 'as const' to make it a literal type
    deepLinking: false,
  },
  staticCSP: true,
};

async function setupPlugins(app: FastifyInstance): Promise<void> {
  log.info('Registering plugins...');

  await Promise.all(
    [
      app.register(fastifyHelmet, {
        contentSecurityPolicy: config.env === 'production' ? undefined : false,
      }),

      app.register(fastifyCors, {
        origin: config.cors.origin,
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      }),

      config.rateLimit.enabled &&
        app.register(fastifyRateLimit, {
          max: config.rateLimit.max,
          timeWindow: config.rateLimit.timeWindow,
        }),

      config.swagger.enabled && app.register(fastifySwagger, swaggerConfig),
      config.swagger.enabled && app.register(fastifySwaggerUi, swaggerUiConfig),
    ].filter(Boolean)
  );
}

function setupHooks(app: FastifyInstance): void {
  // Add request logger
  app.addHook('onRequest', (request, reply, done) => {
    request.log.info({ url: request.raw.url, id: request.id }, 'received request');
    done();
  });

  // Add response logger
  app.addHook('onSend', (request, reply, payload, done) => {
    request.log.info(
      { statusCode: reply.statusCode, responseTime: reply.getResponseTime() },
      'request completed'
    );
    done();
  });
}

function setupErrorHandlers(app: FastifyInstance): void {
  app.setNotFoundHandler(async request => {
    request.log.warn(`Route not found: ${request.method} ${request.url}`);
    return {
      statusCode: 404,
      error: 'Not Found',
      message: `Route ${request.method}:${request.url} not found`,
    };
  });

  app.setErrorHandler<FastifyError>(async (error, request, reply) => {
    const statusCode = error.statusCode || 500;
    const errorResponse: ErrorResponse = {
      statusCode,
      error: error.name,
      message: error.message,
    };

    if (config.env === 'development') {
      errorResponse.stack = error.stack;
    }

    request.log.error(
      {
        request: {
          method: request.method,
          url: request.url,
          params: request.params,
          query: request.query,
        },
        error: errorResponse,
      },
      'Request error'
    );

    return reply.status(statusCode).send(errorResponse);
  });
}

export async function bootstrap(
  app: FastifyInstance,
  _opts: FastifyServerOptions = {}
): Promise<FastifyInstance> {
  log.info(`Starting application in ${config.env} mode`);
  log.info(`Log level: ${config.logLevel}`);

  try {
    await setupPlugins(app);
    setupHooks(app);
    setupErrorHandlers(app);

    // Register routes
    await registerRoutes(app);

    // Health check endpoint
    app.get('/health', () => ({
      status: 'ok',
      timestamp: new Date().toISOString(),
    }));

    // Root endpoint
    app.get('/', () => ({
      name: 'Fastify API',
      version: '1.0.0',
      documentation: `${config.apiPrefix}/documentation`,
    }));

    log.info('Application bootstrap completed');
    return app;
  } catch (error) {
    log.fatal('Failed to bootstrap application', error);
    throw error;
  }
}
