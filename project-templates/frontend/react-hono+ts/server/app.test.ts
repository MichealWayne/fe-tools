import { describe, expect, it } from 'vitest';

import { app } from './app.js';

describe('Hono API', () => {
  it('returns health status', async () => {
    const response = await app.request('/api/health');
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: 'ok' });
  });

  it('validates and trims a greeting request', async () => {
    const response = await app.request('/api/hello', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: ' React ' }),
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ message: '你好，React！这条消息来自 Hono 后端。' });
  });

  it.each([{}, { name: '' }, { name: '   ' }, { name: 42 }, { name: 'a'.repeat(51) }, null])(
    'rejects invalid input: %j',
    async (body) => {
      const response = await app.request('/api/hello', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      expect(response.status).toBe(400);
      expect(await response.json()).toHaveProperty('error');
    },
  );

  it('returns JSON for malformed JSON', async () => {
    const response = await app.request('/api/hello', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{',
    });
    expect(response.status).toBe(400);
    expect(await response.json()).toHaveProperty('error');
  });

  it.each(['/api', '/api/missing'])('keeps unknown API routes as JSON: %s', async (path) => {
    const response = await app.request(path, { headers: { Accept: 'text/html' } });
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: '接口不存在' });
  });
});
