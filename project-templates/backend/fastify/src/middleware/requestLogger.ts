import { FastifyInstance } from 'fastify';
import { log } from '../utils/logger';

const requestLogger = (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', (request, reply, done) => {
    const { method, url, query, params, headers } = request;
    const userAgent = headers['user-agent'] || '';
    const ip = request.ip;

    log.info('Request received', {
      method,
      url,
      query,
      params,
      userAgent,
      ip,
      requestId: request.id,
    });

    const startTime = Date.now();

    reply.raw.on('finish', () => {
      const responseTime = Date.now() - startTime;
      log.info('Response sent', {
        method: request.method,
        url: request.url,
        statusCode: reply.statusCode,
        responseTime: `${responseTime}ms`,
        requestId: request.id,
      });
    });

    done();
  });
};

export default requestLogger;
