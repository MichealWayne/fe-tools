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

  it('returns an HTTP 404 for unknown routes', async () => {
    const app = await bootstrap(fastify({ logger: false }));

    const response = await app.inject({
      method: 'GET',
      url: '/missing',
    });

    await app.close();

    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual(
      expect.objectContaining({
        statusCode: 404,
        error: 'Not Found',
      })
    );
  });

  it('hides internal error details from 5xx responses', async () => {
    const app = await bootstrap(fastify({ logger: false }));
    app.get('/test/internal-error', async () => {
      throw new Error('database password should not be returned');
    });

    const response = await app.inject({ method: 'GET', url: '/test/internal-error' });
    await app.close();

    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual(
      expect.objectContaining({
        error: 'Internal Server Error',
        message: 'Internal Server Error',
      })
    );
    expect(response.body).not.toContain('database password');
  });

  it('preserves client error status and message', async () => {
    const app = await bootstrap(fastify({ logger: false }));
    app.get('/test/client-error', async () => {
      throw Object.assign(new Error('invalid request'), { statusCode: 400, name: 'BadRequestError' });
    });

    const response = await app.inject({ method: 'GET', url: '/test/client-error' });
    await app.close();

    expect(response.statusCode).toBe(400);
    expect(response.json()).toEqual(
      expect.objectContaining({ error: 'BadRequestError', message: 'invalid request' })
    );
  });
});

