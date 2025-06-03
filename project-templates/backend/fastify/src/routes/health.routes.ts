/**
 * @author Wayne
 * @Date 2025-06-02 14:17:04
 * @LastEditTime 2025-06-02 17:34:15
 */
import { FastifyPluginAsync } from 'fastify';

const healthRoutes: FastifyPluginAsync = async fastify => {
  // Health check endpoint
  fastify.get('/', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    };
  });

  // Liveness probe
  fastify.get('/live', async () => {
    return { status: 'alive' };
  });

  // Readiness probe
  fastify.get('/ready', async (request, reply) => {
    // Add any readiness checks here (e.g., database connection)
    const isReady = true; // Replace with actual checks

    if (!isReady) {
      return reply.status(503).send({
        statusCode: 503,
        error: 'Service Unavailable',
        message: 'Service not ready',
      });
    }

    return { status: 'ready' };
  });
};

export default healthRoutes;
