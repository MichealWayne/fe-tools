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
export declare function createInlineWorker(workerFunction: () => any): Worker;
/**
 * 工作线程池 - 管理多个 Worker 实例
 */
export declare class WorkerPool {
    private workerScript;
    private size;
    private workers;
    private queue;
    private activeWorkers;
    /**
     * 创建工作线程池
     * @param workerScript Worker 脚本路径或函数
     * @param size 线程池大小
     */
    constructor(workerScript: string | (() => any), size?: number);
    /**
     * 初始化工作线程池
     */
    private initialize;
    /**
     * 处理 Worker 消息
     */
    private handleWorkerMessage;
    /**
     * 处理 Worker 错误
     */
    private handleWorkerError;
    /**
     * 处理队列中的任务
     */
    private processQueue;
    /**
     * 提交任务到工作线程池
     * @param data 要处理的数据
     * @returns Promise，解析为工作线程的响应
     */
    exec(data: any): Promise<any>;
    /**
     * 终止所有工作线程并释放资源
     */
    terminate(): void;
}
/**
 * 创建一个可转移对象的 Worker 任务
 * @param data 要处理的数据
 * @param transferables 可转移对象列表
 * @param workerFunction Worker 函数
 * @returns Promise，解析为工作线程的响应
 */
export declare function createWorkerTask<T, R>(data: T, transferables: Transferable[] | undefined, workerFunction: () => any): Promise<R>;
/**
 * 包装一个异步函数，使其在 Worker 中执行
 * @param asyncFunction 要在 Worker 中执行的异步函数
 * @returns 包装后的函数，返回 Promise
 */
export declare function workerize<T, R>(asyncFunction: (data: T) => Promise<R>): (data: T) => Promise<R>;
