'use client';

import { useState } from 'react';

export default function ClientCounter() {
  const [count, setCount] = useState(0);

  return (
    <p>
      <button type="button" onClick={() => setCount((c: number) => c + 1)}>
        count is: {count}
      </button>
    </p>
  );
}
