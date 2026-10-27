import { hc } from 'hono/client';

import type { AppType } from '../server/app';

// 仅导入后端类型，服务端实现不会进入浏览器产物。
export const client = hc<AppType>('/');
