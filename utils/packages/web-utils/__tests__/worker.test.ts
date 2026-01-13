import * as workerModule from '../src/worker';
import {
  createInlineWorker,
  WorkerPool,
  createWorkerTask,
  workerize,
} from '../src/worker';

class MockWorker {
  url: string;
  onmessage: ((event: MessageEvent) => void) | null = null;
  onerror: ((event: ErrorEvent) => void) | null = null;
  private listeners: Record<string, Array<(event: any) => void>> = {};
  terminated = false;

  constructor(url: string) {
    this.url = url;
  }

  addEventListener(type: string, handler: (event: any) => void) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(handler);
  }

  postMessage(data: any) {
    setTimeout(() => {
      if (this.onmessage) {
        this.onmessage({ data } as MessageEvent);
      }
      this.emit('message', { data });
    }, 0);
  }

  terminate() {
    this.terminated = true;
  }

  emit(type: string, payload: any) {
    (this.listeners[type] || []).forEach(handler => handler(payload));
  }
}

describe('worker utils', () => {
  const originalWorker = (globalThis as any).Worker;
  const originalCreateObjectURL = URL.createObjectURL;
  const originalRevokeObjectURL = URL.revokeObjectURL;

  beforeEach(() => {
    (globalThis as any).Worker = MockWorker;
    URL.createObjectURL = jest.fn().mockReturnValue('blob:mock');
    URL.revokeObjectURL = jest.fn();
  });

  afterEach(() => {
    (globalThis as any).Worker = originalWorker;
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
    jest.clearAllTimers();
  });

  it('createInlineWorker should create worker and revoke URL on error', () => {
    const worker = createInlineWorker(() => undefined) as any as MockWorker;
    expect(worker.url).toBe('blob:mock');
    worker.emit('error', new ErrorEvent('error'));
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock');
  });

  it('WorkerPool should return a promise for tasks', () => {
    const pool = new WorkerPool('worker.js', 1);
    const promise = pool.exec({ ok: true });
    expect(promise).toBeInstanceOf(Promise);
    pool.terminate();
  });

  it('WorkerPool should reject pending tasks on terminate', async () => {
    const pool = new WorkerPool('worker.js', 0);
    const promise = pool.exec({ ok: true });
    pool.terminate();
    await expect(promise).rejects.toThrow('Worker pool terminated');
  });

  it('createWorkerTask should resolve with message data', async () => {
    jest.useFakeTimers();
    const promise = createWorkerTask({ a: 1 }, [], () => undefined);
    jest.runAllTimers();
    await expect(promise).resolves.toEqual({ a: 1 });
    jest.useRealTimers();
  });

  it('workerize should return a function that returns a promise', () => {
    const fn = workerize(async (data: number) => data + 1);
    const result = fn(1);
    expect(result).toBeInstanceOf(Promise);
  });
});
