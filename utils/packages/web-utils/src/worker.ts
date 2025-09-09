/**
 * @author Wayne
 * @Date 2023-05-28 15:21:44
 * @LastEditTime 2025-06-08 19:43:58
 * @description Web Worker 工具函数
 */

/**
 * @function createInlineWorker
 * @description 创建一个内联Worker。Creates an inline Worker
 * @param {function} workerFunction - 要在Worker中执行的函数。The function to execute in the Worker
 * @returns {Worker} 返回创建的Worker实例。Returns the created Worker instance
 */
export function createInlineWorker(workerFunction: () => any): Worker {
  // 将函数转为字符串
  const functionStr = workerFunction.toString();
  const blob = new Blob([`(${functionStr})()`], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);

  // 当 worker 被终止时释放 URL
  worker.addEventListener('error', () => URL.revokeObjectURL(url));

  return worker;
}

/**
 * 工作线程池 - 管理多个 Worker 实例
 */
export class WorkerPool {
  private workers: Worker[] = [];
  private queue: Array<{
    task: any;
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
  }> = [];
  private activeWorkers: Set<Worker> = new Set();

  /**
   * 创建工作线程池
   * @param workerScript Worker 脚本路径或函数
   * @param size 线程池大小
   */
  constructor(
    private workerScript: string | (() => any),
    private size: number = navigator.hardwareConcurrency || 4
  ) {
    this.initialize();
  }

  /**
   * 初始化工作线程池
   */
  private initialize() {
    for (let i = 0; i < this.size; i++) {
      let worker: Worker;

      if (typeof this.workerScript === 'string') {
        worker = new Worker(this.workerScript);
      } else {
        worker = createInlineWorker(this.workerScript);
      }

      worker.addEventListener('message', event => {
        this.handleWorkerMessage(worker, event);
      });

      worker.addEventListener('error', error => {
        this.handleWorkerError(worker, error);
      });

      this.workers.push(worker);
    }
  }

  /**
   * 处理 Worker 消息
   */
  private handleWorkerMessage(worker: Worker, event: MessageEvent) {
    this.activeWorkers.delete(worker);

    // 查找与此工作线程关联的任务
    const taskIndex = this.queue.findIndex(item => item.task.workerId === worker.onmessage);

    if (taskIndex !== -1) {
      const { resolve } = this.queue[taskIndex];
      this.queue.splice(taskIndex, 1);
      resolve(event.data);
    }

    this.processQueue();
  }

  /**
   * 处理 Worker 错误
   */
  private handleWorkerError(worker: Worker, error: ErrorEvent) {
    this.activeWorkers.delete(worker);

    // 查找与此工作线程关联的任务
    const taskIndex = this.queue.findIndex(item => item.task.workerId === worker.onmessage);

    if (taskIndex !== -1) {
      const { reject } = this.queue[taskIndex];
      this.queue.splice(taskIndex, 1);
      reject(error);
    }

    this.processQueue();
  }

  /**
   * 处理队列中的任务
   */
  private processQueue() {
    if (this.queue.length === 0) return;

    const availableWorker = this.workers.find(worker => !this.activeWorkers.has(worker));

    if (availableWorker) {
      const task = this.queue.shift();
      if (task) {
        this.activeWorkers.add(availableWorker);
        task.task.workerId = availableWorker.onmessage;
        availableWorker.postMessage(task.task.data);
      }
    }
  }

  /**
   * 提交任务到工作线程池
   * @param data 要处理的数据
   * @returns Promise，解析为工作线程的响应
   */
  exec(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const task = {
        data,
        workerId: null,
      };

      this.queue.push({ task, resolve, reject });
      this.processQueue();
    });
  }

  /**
   * 终止所有工作线程并释放资源
   */
  terminate() {
    this.workers.forEach(worker => worker.terminate());
    this.workers = [];
    this.activeWorkers.clear();

    // 拒绝所有待处理的任务
    this.queue.forEach(({ reject }) => {
      reject(new Error('Worker pool terminated'));
    });
    this.queue = [];
  }
}

/**
 * 创建一个可转移对象的 Worker 任务
 * @param data 要处理的数据
 * @param transferables 可转移对象列表
 * @param workerFunction Worker 函数
 * @returns Promise，解析为工作线程的响应
 */
export function createWorkerTask<T, R>(
  data: T,
  transferables: Transferable[] = [],
  workerFunction: () => any
): Promise<R> {
  return new Promise((resolve, reject) => {
    const worker = createInlineWorker(workerFunction);

    worker.onmessage = e => {
      resolve(e.data as R);
      worker.terminate();
    };

    worker.onerror = error => {
      reject(error);
      worker.terminate();
    };

    worker.postMessage(data, transferables);
  });
}

/**
 * 包装一个异步函数，使其在 Worker 中执行
 * @param asyncFunction 要在 Worker 中执行的异步函数
 * @returns 包装后的函数，返回 Promise
 */
export function workerize<T, R>(asyncFunction: (data: T) => Promise<R>) {
  return (data: T): Promise<R> => {
    const fnString = asyncFunction.toString();

    const workerFunction = () => {
      self.onmessage = async e => {
        try {
          // 在 Worker 上下文中执行传入的函数
          // eslint-disable-next-line @typescript-eslint/no-implied-eval
          const fn = new Function('data', `return (${fnString})(data);`);
          const result = await fn(e.data);
          // 在 Worker 上下文中
          // eslint-disable-next-line no-restricted-globals
          self.postMessage(result);
        } catch (error) {
          // 在 Worker 上下文中
          // eslint-disable-next-line no-restricted-globals
          self.postMessage({ error: (error as Error).message });
        }
      };
    };

    return createWorkerTask<T, R>(data, [], workerFunction);
  };
}
