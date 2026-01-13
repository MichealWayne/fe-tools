"use strict";
/**
 * @author Wayne
 * @Date 2023-05-28 15:21:44
 * @LastEditTime 2025-06-08 19:43:58
 * @description Web Worker 工具函数
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workerize = exports.createWorkerTask = exports.WorkerPool = exports.createInlineWorker = void 0;
/**
 * @function createInlineWorker
 * @description 创建一个内联Worker。Creates an inline Worker
 * @param {function} workerFunction - 要在Worker中执行的函数。The function to execute in the Worker
 * @returns {Worker} 返回创建的Worker实例。Returns the created Worker instance
 */
function createInlineWorker(workerFunction) {
    // 将函数转为字符串
    var functionStr = workerFunction.toString();
    var blob = new Blob(["(".concat(functionStr, ")()")], { type: 'application/javascript' });
    var url = URL.createObjectURL(blob);
    var worker = new Worker(url);
    // 当 worker 被终止时释放 URL
    worker.addEventListener('error', function () { return URL.revokeObjectURL(url); });
    return worker;
}
exports.createInlineWorker = createInlineWorker;
/**
 * 工作线程池 - 管理多个 Worker 实例
 */
var WorkerPool = /** @class */ (function () {
    /**
     * 创建工作线程池
     * @param workerScript Worker 脚本路径或函数
     * @param size 线程池大小
     */
    function WorkerPool(workerScript, size) {
        if (size === void 0) { size = navigator.hardwareConcurrency || 4; }
        this.workerScript = workerScript;
        this.size = size;
        this.workers = [];
        this.queue = [];
        this.activeWorkers = new Set();
        this.initialize();
    }
    /**
     * 初始化工作线程池
     */
    WorkerPool.prototype.initialize = function () {
        var _this = this;
        var _loop_1 = function (i) {
            var worker;
            if (typeof this_1.workerScript === 'string') {
                worker = new Worker(this_1.workerScript);
            }
            else {
                worker = createInlineWorker(this_1.workerScript);
            }
            worker.addEventListener('message', function (event) {
                _this.handleWorkerMessage(worker, event);
            });
            worker.addEventListener('error', function (error) {
                _this.handleWorkerError(worker, error);
            });
            this_1.workers.push(worker);
        };
        var this_1 = this;
        for (var i = 0; i < this.size; i++) {
            _loop_1(i);
        }
    };
    /**
     * 处理 Worker 消息
     */
    WorkerPool.prototype.handleWorkerMessage = function (worker, event) {
        this.activeWorkers.delete(worker);
        // 查找与此工作线程关联的任务
        var taskIndex = this.queue.findIndex(function (item) { return item.task.workerId === worker.onmessage; });
        if (taskIndex !== -1) {
            var resolve = this.queue[taskIndex].resolve;
            this.queue.splice(taskIndex, 1);
            resolve(event.data);
        }
        this.processQueue();
    };
    /**
     * 处理 Worker 错误
     */
    WorkerPool.prototype.handleWorkerError = function (worker, error) {
        this.activeWorkers.delete(worker);
        // 查找与此工作线程关联的任务
        var taskIndex = this.queue.findIndex(function (item) { return item.task.workerId === worker.onmessage; });
        if (taskIndex !== -1) {
            var reject = this.queue[taskIndex].reject;
            this.queue.splice(taskIndex, 1);
            reject(error);
        }
        this.processQueue();
    };
    /**
     * 处理队列中的任务
     */
    WorkerPool.prototype.processQueue = function () {
        var _this = this;
        if (this.queue.length === 0)
            return;
        var availableWorker = this.workers.find(function (worker) { return !_this.activeWorkers.has(worker); });
        if (availableWorker) {
            var task = this.queue.shift();
            if (task) {
                this.activeWorkers.add(availableWorker);
                task.task.workerId = availableWorker.onmessage;
                availableWorker.postMessage(task.task.data);
            }
        }
    };
    /**
     * 提交任务到工作线程池
     * @param data 要处理的数据
     * @returns Promise，解析为工作线程的响应
     */
    WorkerPool.prototype.exec = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var task = {
                data: data,
                workerId: null,
            };
            _this.queue.push({ task: task, resolve: resolve, reject: reject });
            _this.processQueue();
        });
    };
    /**
     * 终止所有工作线程并释放资源
     */
    WorkerPool.prototype.terminate = function () {
        this.workers.forEach(function (worker) { return worker.terminate(); });
        this.workers = [];
        this.activeWorkers.clear();
        // 拒绝所有待处理的任务
        this.queue.forEach(function (_a) {
            var reject = _a.reject;
            reject(new Error('Worker pool terminated'));
        });
        this.queue = [];
    };
    return WorkerPool;
}());
exports.WorkerPool = WorkerPool;
/**
 * 创建一个可转移对象的 Worker 任务
 * @param data 要处理的数据
 * @param transferables 可转移对象列表
 * @param workerFunction Worker 函数
 * @returns Promise，解析为工作线程的响应
 */
function createWorkerTask(data, transferables, workerFunction) {
    if (transferables === void 0) { transferables = []; }
    return new Promise(function (resolve, reject) {
        var worker = createInlineWorker(workerFunction);
        worker.onmessage = function (e) {
            resolve(e.data);
            worker.terminate();
        };
        worker.onerror = function (error) {
            reject(error);
            worker.terminate();
        };
        worker.postMessage(data, transferables);
    });
}
exports.createWorkerTask = createWorkerTask;
/**
 * 包装一个异步函数，使其在 Worker 中执行
 * @param asyncFunction 要在 Worker 中执行的异步函数
 * @returns 包装后的函数，返回 Promise
 */
function workerize(asyncFunction) {
    var _this = this;
    return function (data) {
        var fnString = asyncFunction.toString();
        var workerFunction = function () {
            self.onmessage = function (e) { return __awaiter(_this, void 0, void 0, function () {
                var fn, result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            fn = new Function('data', "return (".concat(fnString, ")(data);"));
                            return [4 /*yield*/, fn(e.data)];
                        case 1:
                            result = _a.sent();
                            // 在 Worker 上下文中
                            // eslint-disable-next-line no-restricted-globals
                            self.postMessage(result);
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            // 在 Worker 上下文中
                            // eslint-disable-next-line no-restricted-globals
                            self.postMessage({ error: error_1.message });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
        };
        return createWorkerTask(data, [], workerFunction);
    };
}
exports.workerize = workerize;
