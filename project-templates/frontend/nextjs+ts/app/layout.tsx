/*
 * @author Wayne
 * @Date 2025-10-13 19:47:19
 * @LastEditTime 2025-10-13 20:18:42
 */
import React from 'react';

import './globals.css';

export const metadata = {
  title: 'Next.js + TS Template',
  description: 'A simple Next.js + TypeScript template',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-white text-gray-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
        {children}
      </body>
    </html>
  );
}
