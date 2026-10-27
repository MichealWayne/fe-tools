import { useState } from 'react';
import type { FormEvent } from 'react';

import { client } from './api';

const App = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React');
  const [message, setMessage] = useState('输入姓名，向 Hono 后端发送请求。');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const sayHello = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await client.api.hello.$post({ json: { name } });
      const data = await response.json();
      if ('error' in data) throw new Error(data.error);
      if (!response.ok) throw new Error('请求失败，请稍后重试');
      setMessage(data.message);
    } catch (error) {
      setError(error instanceof Error ? error.message : '请求失败，请检查后端服务');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <header>
        <p className="eyebrow">FULL STACK TEMPLATE</p>
        <h1>React + Hono</h1>
        <p>React 交互页面 · Vite 热更新 · Hono API · TypeScript 类型共享</p>
      </header>
      <section aria-labelledby="client-title">
        <h2 id="client-title">前端交互</h2>
        <p>使用 React state 更新页面。</p>
        <button onClick={() => setCount((value) => value + 1)}>点击次数：{count}</button>
      </section>
      <section aria-labelledby="server-title">
        <h2 id="server-title">前后端通信</h2>
        <form onSubmit={sayHello}>
          <label htmlFor="name">姓名</label>
          <div className="form-row">
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={50}
              required
            />
            <button disabled={loading} type="submit">
              {loading ? '请求中…' : '发送问候'}
            </button>
          </div>
        </form>
        <p role="status">{message}</p>
        {error && <p role="alert">{error}</p>}
      </section>
      <footer>
        编辑 <code>src/App.tsx</code> 或 <code>server/app.ts</code> 开始开发。
        <nav aria-label="开发文档">
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            React 文档
          </a>
          <a href="https://hono.dev" target="_blank" rel="noreferrer">
            Hono 文档
          </a>
          <a href="/api/health" target="_blank" rel="noreferrer">
            API 健康检查
          </a>
        </nav>
      </footer>
    </main>
  );
};

export default App;
