import Router from '@koa/router';

const getHealthStatus = () => ({
  status: 'ok',
  timestamp: new Date().toISOString(),
  uptime: process.uptime(),
});

const router = new Router({ prefix: '/health' });

router
  .get('/', ctx => {
    ctx.body = getHealthStatus();
  })
  .get('/live', ctx => {
    ctx.body = getHealthStatus();
  })
  .get('/ready', ctx => {
    ctx.body = getHealthStatus();
  });

export default router;
