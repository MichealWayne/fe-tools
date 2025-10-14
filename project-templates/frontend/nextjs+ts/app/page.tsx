/*
 * @author Wayne
 * @Date 2025-10-13 19:47:23
 * @LastEditTime 2025-10-13 20:21:52
 */
import React from 'react';

import ClientCounter from '../components/ClientCounter';

export default async function Page() {
  // 这里是服务端环境，可进行数据获取（示例保持静态）
  return (
    <div className="text-center">
      <header className="bg-[#282c34] min-h-screen flex flex-col items-center justify-center text-[calc(10px+2vmin)] text-white">
        <img
          src="/logo.svg"
          alt="logo"
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
        />
        <p>Hello Next.js + React!</p>

        {/* 客户端交互（仅在浏览器执行），与 SSR 分离 */}
        <ClientCounter />

        <p>
          Edit <code className="text-3xl font-bold text-blue-600">app/page.tsx</code> and save to
          test Fast Refresh.
        </p>
        <p>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#61dafb] hover:underline"
          >
            Learn React
          </a>
          {' | '}
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#61dafb] hover:underline"
          >
            Next.js Docs
          </a>
        </p>
      </header>
    </div>
  );
}
