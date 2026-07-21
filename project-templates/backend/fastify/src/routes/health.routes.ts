import { FastifyPluginAsync } from 'fastify';

const getHealthStatus = () => ({
  status: 'ok' as const,
  timestamp: new Date().toISOString(),
  uptime: process.uptime(),
});

const healthRoutes: FastifyPluginAsync = async fastify => {
  fastify.get('/', async () => getHealthStatus());

  fastify.get('/live', async () => getHealthStatus());

  fastify.get('/ready', async (_request, reply) => {
    const isReady = true;

    if (!isReady) {
      return reply.status(503).send({
        status: 'unavailable',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      });
    }

    return getHealthStatus();
  });
};

export default healthRoutes;
