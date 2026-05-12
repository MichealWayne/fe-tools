import fastify from 'fastify';

import { bootstrap } from './app';

describe('Fastify app', () => {
  it('responds to health check', async () => {
    const app = await bootstrap(fastify({ logger: false }));

    const response = await app.inject({
      method: 'GET',
      url: '/health',
    });

    await app.close();

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(
      expect.objectContaining({
        status: 'ok',
      })
    );
  });
});

