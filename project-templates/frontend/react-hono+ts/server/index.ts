import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';

import { app } from './app.js';

const port = Number(process.env.PORT || 3001);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT 必须是 1–65535 之间的整数');
}

// 编译后位于 dist/server，静态文件位于 dist/client；开发时由 Vite 提供页面。
const root = fileURLToPath(new URL('../client/', import.meta.url));
if (existsSync(root)) {
  app.use('*', serveStatic({ root }));
  app.get('*', (c, next) => {
    if (!c.req.header('Accept')?.includes('text/html')) return next();
    return serveStatic({ root, path: 'index.html' })(c, next);
  });
}

const server = serve({ fetch: app.fetch, port, hostname: '0.0.0.0' }, (info) => {
  console.log(`Hono server: http://localhost:${info.port}`);
});

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => server.close());
}
