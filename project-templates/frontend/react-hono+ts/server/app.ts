import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { validator } from 'hono/validator';

// 链式定义路由，让 Hono RPC 推导前后端的请求和响应类型。
const api = new Hono()
  .get('/health', (c) => c.json({ status: 'ok' as const }))
  .post(
    '/hello',
    validator('json', (value: unknown, c) => {
      const name =
        typeof value === 'object' && value !== null && 'name' in value ? value.name : undefined;
      if (typeof name !== 'string' || !name.trim() || name.trim().length > 50) {
        return c.json({ error: '请输入 1–50 个字符的姓名' }, 400);
      }
      return { name: name.trim() };
    }),
    (c) => {
      const { name } = c.req.valid('json');
      return c.json({ message: `你好，${name}！这条消息来自 Hono 后端。` });
    },
  );

export const app = new Hono().route('/api', api);
export type AppType = typeof app;

// API 未命中时始终返回 JSON，不能落到前端 HTML 回退。
app.all('/api', (c) => c.json({ error: '接口不存在' }, 404));
app.all('/api/*', (c) => c.json({ error: '接口不存在' }, 404));
app.onError((error, c) => {
  if (error instanceof HTTPException && error.status < 500) {
    return c.json({ error: error.message }, error.status);
  }
  console.error(error);
  return c.json({ error: '服务器内部错误' }, 500);
});
