/**
 * @fileoverview System monitoring and information utilities for Node.js applications, providing comprehensive system metrics and performance monitoring capabilities.
 *
 * This module provides extensive system monitoring functionality including CPU usage, memory statistics,
 * disk space monitoring, process information, and load averages. It supports cross-platform operations
 * with some Unix/Linux specific features for detailed system analysis.
 *
 * @module OS
 * @author Wayne
 * @since 1.0.0
 */

import os from 'os';
import childrenProcess from 'child_process';

type AnyCallbackFunc = (...args: unknown[]) => any;

/**
 * @function platform
 * @description 获取当前主机平台标识符。Gets the current host platform identifier for cross-platform compatibility checks.
 * @returns {NodeJS.Platform} 平台标识符（'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', 'win32'）。The platform identifier ('aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', 'win32')
 * @example
 * // Check platform for conditional logic
 * const currentPlatform = platform();
 * if (currentPlatform === 'win32') {
 *   console.log('Running on Windows');
 * } else if (currentPlatform === 'darwin') {
 *   console.log('Running on macOS');
 * } else {
 *   console.log('Running on Unix-like system');
 * }
 *
 * @example
 * // Platform-specific file paths
 * const configPath = platform() === 'win32'
 *   ? 'C:\\Users\\config.json'
 *   : '/home/user/config.json';
 *
 * @see {@link https://nodejs.org/api/process.html#process_process_platform} - Node.js process.platform documentation
 */
export function platform() {
  return process.platform;
}

/**
 * @function cpuCount
 * @description 获取系统可用的CPU核心数量。Gets the number of CPU cores available on the system for optimal resource allocation.
 * @returns {number} 逻辑CPU核心数量。The number of logical CPU cores
 * @example
 * // Optimize worker processes based on CPU count
 * const workers = Math.min(cpuCount(), 4);
 * console.log(`Starting ${workers} worker processes`);
 *
 * @example
 * // Performance monitoring
 * const cores = cpuCount();
 * console.log(`System has ${cores} CPU cores available`);
 *
 * @since 1.0.0
 * @see {@link https://nodejs.org/api/os.html#os_os_cpus} - Node.js os.cpus() documentation
 */
export function cpuCount() {
  return os.cpus().length;
}

/**
 * @function sysUptime
 * @description 获取系统从上次启动以来的运行时间（秒）。Gets the system uptime in seconds since last boot for system stability monitoring.
 * @returns {number} 系统运行时间（秒）。System uptime in seconds
 * @example
 * // Display human-readable uptime
 * const uptime = sysUptime();
 * const days = Math.floor(uptime / 86400);
 * const hours = Math.floor((uptime % 86400) / 3600);
 * console.log(`System uptime: ${days} days, ${hours} hours`);
 *
 * @example
 * // Check if system recently rebooted
 * if (sysUptime() < 3600) {
 *   console.log('System was recently rebooted (less than 1 hour ago)');
 * }
 *
 * @since 1.0.0
 * @see {@link https://nodejs.org/api/os.html#os_os_uptime} - Node.js os.uptime() documentation
 */
export function sysUptime() {
  // unit: second
  return os.uptime();
}

/**
 * @function processUptime
 * @description 获取Node.js进程从启动以来的运行时间（秒）。Gets the Node.js process uptime in seconds since the process started for application monitoring.
 * @returns {number} 进程运行时间（秒）。Process uptime in seconds
 * @example
 * // Log application runtime
 * const runtime = processUptime();
 * console.log(`Application has been running for ${runtime.toFixed(2)} seconds`);
 *
 * @example
 * // Performance monitoring and restart logic
 * if (processUptime() > 86400) { // 24 hours
 *   console.log('Process has been running for over 24 hours, consider restart');
 * }
 *
 * @example
 * // Calculate startup time
 * setTimeout(() => {
 *   console.log(`Application startup took ${processUptime()} seconds`);
 * }, 0);
 *
 * @since 1.0.0
 * @see {@link https://nodejs.org/api/process.html#process_process_uptime} - Node.js process.uptime() documentation
 */
export function processUptime() {
  // unit: second
  return process.uptime();
}

/**
 * @function freemem
 * @description 获取系统可用内存量（MB）。Gets the amount of free system memory in megabytes for memory monitoring and management.
 * @returns {number} 可用内存（MB）。Free memory in MB
 * @example
 * // Memory monitoring
 * const freeMemMB = freemem();
 * console.log(`Free memory: ${freeMemMB.toFixed(2)} MB`);
 *
 * @example
 * // Memory-based scaling decisions
 * if (freemem() < 512) {
 *   console.warn('Low memory warning: less than 512MB available');
 * }
 *
 * @example
 * // Memory usage percentage
 * const freePercent = (freemem() / totalmem()) * 100;
 * console.log(`${freePercent.toFixed(1)}% memory available`);
 *
 * @since 1.0.0
 * @see {@link totalmem} - Get total system memory
 * @see {@link https://nodejs.org/api/os.html#os_os_freemem} - Node.js os.freemem() documentation
 */
export function freemem() {
  return os.freemem() / (1024 * 1024);
}

/**
 * @function totalmem
 * @description 获取系统总内存量（MB）。Gets the total amount of system memory in megabytes for system capacity planning.
 * @returns {number} 总内存（MB）。Total memory in MB
 * @example
 * // System specifications
 * const totalMemMB = totalmem();
 * console.log(`Total system memory: ${totalMemMB.toFixed(2)} MB`);
 *
 * @example
 * // Memory-based configuration
 * const maxWorkers = Math.floor(totalmem() / 1024); // 1 worker per GB
 * console.log(`Configuring ${maxWorkers} workers based on ${totalMemMB} MB RAM`);
 *
 * @since 1.0.0
 * @see {@link freemem} - Get free system memory
 * @see {@link https://nodejs.org/api/os.html#os_os_totalmem} - Node.js os.totalmem() documentation
 */
export function totalmem() {
  return os.totalmem() / (1024 * 1024);
}

/**
 * @function freememPercentage
 * @description 获取可用内存相对于总内存的百分比。Gets the percentage of free memory relative to total memory for memory usage monitoring.
 * @returns {number} 可用内存百分比（十进制，0-1）。Free memory percentage as a decimal (0-1)
 * @example
 * // Memory usage alerts
 * const freePercent = freememPercentage();
 * if (freePercent < 0.1) {
 *   console.error(`Critical: Only ${(freePercent * 100).toFixed(1)}% memory available`);
 * } else if (freePercent < 0.2) {
 *   console.warn(`Warning: ${(freePercent * 100).toFixed(1)}% memory available`);
 * }
 *
 * @example
 * // Memory-based throttling
 * const memoryUsage = 1 - freememPercentage();
 * if (memoryUsage > 0.8) {
 *   console.log('High memory usage detected, throttling operations');
 * }
 *
 * @since 1.0.0
 * @see {@link freemem} - Get free memory in MB
 * @see {@link totalmem} - Get total memory in MB
 */
export function freememPercentage() {
  return os.freemem() / os.totalmem();
}

/**
 * @function freeCommand
 * @description 执行Linux 'free -m'命令获取详细内存信息。Executes Linux 'free -m' command to get detailed memory information including cache and buffer usage.
 * @param {AnyCallbackFunc} callback - 接收(usedMem, cachedMem)参数（MB）的回调函数。Callback function receiving (usedMem, cachedMem) in MB
 * @example
 * // Get detailed Linux memory info
 * freeCommand((usedMem, cachedMem) => {
 *   console.log(`Used memory: ${usedMem} MB`);
 *   console.log(`Cached memory: ${cachedMem} MB`);
 * });
 *
 * @example
 * // Memory monitoring on Linux servers
 * if (platform() === 'linux') {
 *   freeCommand((used, cached) => {
 *     const effectiveUsed = used - cached;
 *     console.log(`Effective memory usage: ${effectiveUsed} MB`);
 *   });
 * }
 *
 * @deprecated Consider using cross-platform memory functions for better compatibility
 * @since 1.0.0
 * @see {@link freemem} - Cross-platform free memory function
 * @see {@link totalmem} - Cross-platform total memory function
 */
export function freeCommand(callback: AnyCallbackFunc) {
  // Only Linux
  childrenProcess.exec('free -m', function (err, stdout) {
    const lines = stdout.split('\n');

    const str_mem_info = lines[1].replace(/[\s\n\r]+/g, ' ');

    const mem_info = str_mem_info.split(' ');

    const total_mem = parseFloat(mem_info[1]);
    const free_mem = parseFloat(mem_info[3]);
    const buffers_mem = parseFloat(mem_info[5]);
    const cached_mem = parseFloat(mem_info[6]);

    const used_mem = total_mem - (free_mem + buffers_mem + cached_mem);

    callback(used_mem, cached_mem);
  });
}

/**
 * @function harddrive
 * @description 使用'df -k'命令获取磁盘使用信息（仅Unix/Linux）。Gets disk usage information using 'df -k' command for storage monitoring on Unix/Linux systems.
 * @param {AnyCallbackFunc} callback - 接收(totalMB, freeMB, usedMB)的回调函数。Callback function receiving (totalMB, freeMB, usedMB)
 * @example
 * // Monitor disk space
 * harddrive((total, free, used) => {
 *   const usagePercent = (used / total) * 100;
 *   console.log(`Disk usage: ${usagePercent.toFixed(1)}% (${used}/${total} MB)`);
 *
 *   if (usagePercent > 90) {
 *     console.warn('Disk space critically low!');
 *   }
 * });
 *
 * @example
 * // Automated cleanup trigger
 * if (platform() !== 'win32') {
 *   harddrive((total, free, used) => {
 *     if (free < 1000) { // Less than 1GB free
 *       console.log('Triggering cleanup: low disk space');
 *       // Trigger cleanup logic
 *     }
 *   });
 * }
 *
 * @deprecated Unix/Linux only - consider using cross-platform disk monitoring libraries
 * @since 1.0.0
 */
// Hard Disk Drive
export function harddrive(callback: AnyCallbackFunc) {
  childrenProcess.exec('df -k', function (err, stdout) {
    if (err) {
      return console.error(err);
    }
    let total = 0;
    let used = 0;
    let free = 0;

    const lines = stdout.split('\n');

    const str_disk_info = lines[1].replace(/[\s\n\r]+/g, ' ');

    const disk_info: string[] = str_disk_info.split(' ');

    total = Math.ceil((Number(disk_info[1]) * 1024) / Math.pow(1024, 2));
    used = Math.ceil((Number(disk_info[2]) * 1024) / Math.pow(1024, 2));
    free = Math.ceil((Number(disk_info[3]) * 1024) / Math.pow(1024, 2));

    callback(total, free, used);
  });
}

/**
 * @function getProcesses
 * @description 获取按CPU使用率排序的运行进程信息（仅Unix/Linux）。Gets running process information sorted by CPU usage for system monitoring on Unix/Linux systems.
 * @param {number | AnyCallbackFunc} nProcess - 要返回的进程数量，或如果省略则为回调函数。Number of processes to return, or callback if omitted
 * @param {AnyCallbackFunc} callback - 接收格式化进程列表字符串的回调函数。Callback function receiving formatted process list string
 * @example
 * // Get top 5 CPU-intensive processes
 * getProcesses(5, (processInfo) => {
 *   console.log('Top 5 processes by CPU usage:');
 *   console.log(processInfo);
 * });
 *
 * @example
 * // Get default top 10 processes
 * getProcesses((processInfo) => {
 *   console.log('Process information:');
 *   console.log(processInfo);
 * });
 *
 * @example
 * // Monitor system load
 * if (platform() !== 'win32') {
 *   getProcesses(3, (info) => {
 *     console.log('Top 3 resource-intensive processes:');
 *     console.log(info);
 *   });
 * }
 *
 * @deprecated Unix/Linux only - consider using cross-platform process monitoring
 * @since 1.0.0
 */
// Return process running current
export function getProcesses(nProcess: number | AnyCallbackFunc, callback: AnyCallbackFunc) {
  // if nprocess is undefined then is function
  if (typeof nProcess === 'function') {
    callback = nProcess;
    nProcess = 0;
  }

  let command = 'ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n ' + 10;
  //command = 'ps aux | head -n '+ 11
  //command = 'ps aux | head -n '+ (nProcess + 1)
  if (nProcess > 0)
    command = 'ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n ' + (nProcess + 1);

  childrenProcess.exec(command, function (error, stdout) {
    const lines = stdout.split('\n');
    lines.shift();
    lines.pop();

    let result = '';

    lines.forEach(_item => {
      const _str = _item.replace(/[\s\n\r]+/g, ' ');
      const _strList = _str.split(' ');

      result +=
        _strList[1] +
        ' ' +
        _strList[2] +
        ' ' +
        _strList[3] +
        ' ' +
        _strList[4].substring(_strList[4].length - 25) +
        '\n';
    });

    callback(result);
  });
}

/**
 * @function allLoadavg
 * @description 获取所有1、5和15分钟的负载平均值作为格式化字符串。Gets all load average values for 1, 5, and 15 minutes as a formatted string for comprehensive system load monitoring.
 * @returns {string} 逗号分隔的负载平均值："1分钟,5分钟,15分钟"。Comma-separated load averages: "1min,5min,15min"
 * @example
 * // System load monitoring
 * const loadAvg = allLoadavg();
 * console.log(`Load averages: ${loadAvg}`);
 * // Output: "0.5234,0.4123,0.3456"
 *
 * @example
 * // Parse and analyze load averages
 * const [load1, load5, load15] = allLoadavg().split(',').map(Number);
 * if (load1 > cpuCount()) {
 *   console.warn('System under high load');
 * }
 *
 * @since 1.0.0
 * @see {@link loadavg} - Get specific time period load average
 * @see {@link https://nodejs.org/api/os.html#os_os_loadavg} - Node.js os.loadavg() documentation
 */
export function allLoadavg() {
  const loads = os.loadavg();

  return loads[0].toFixed(4) + ',' + loads[1].toFixed(4) + ',' + loads[2].toFixed(4);
}

/**
 * @function loadavg
 * @description 获取特定时间段的系统负载平均值。Gets system load average for a specific time period for targeted load monitoring.
 * @param {number} [time=1] - 时间段：1、5或15分钟（默认为1）。Time period: 1, 5, or 15 minutes (defaults to 1)
 * @returns {number} 指定时间段的负载平均值。Load average for the specified time period
 * @example
 * // Check current system load
 * const currentLoad = loadavg(1);
 * const cores = cpuCount();
 *
 * if (currentLoad > cores * 0.8) {
 *   console.warn(`High system load: ${currentLoad} (${cores} cores available)`);
 * }
 *
 * @example
 * // Compare load trends
 * const load1min = loadavg(1);
 * const load5min = loadavg(5);
 * const load15min = loadavg(15);
 *
 * console.log(`Load trend: 1m=${load1min}, 5m=${load5min}, 15m=${load15min}`);
 *
 * @example
 * // Auto-scaling decision
 * if (loadavg(5) > cpuCount() * 1.5) {
 *   console.log('Consider scaling up: sustained high load');
 * }
 *
 * @since 1.0.0
 * @see {@link allLoadavg} - Get all load averages at once
 * @see {@link cpuCount} - Get number of CPU cores for comparison
 */
export function loadavg(time = 1) {
  if (time !== 5 && time !== 15) time = 1;

  const loads = os.loadavg();
  let v = 0;
  if (time === 1) v = loads[0];
  else if (time === 5) v = loads[1];
  else if (time === 15) v = loads[2];

  return v;
}

/**
 * @function getCPUUsage
 * @description 在1秒采样期内计算CPU使用率百分比。Calculates CPU usage percentage over a 1-second sampling period for accurate performance monitoring.
 * @param {AnyCallbackFunc} callback - 接收CPU使用率（十进制0-1）的回调函数。Callback function receiving CPU usage as decimal (0-1)
 * @param {boolean} [free=false] - 如果为true，返回CPU空闲百分比；如果为false，返回使用百分比。If true, returns free CPU percentage; if false, returns used percentage
 * @example
 * // Monitor CPU usage
 * getCPUUsage((usage) => {
 *   console.log(`CPU usage: ${(usage * 100).toFixed(1)}%`);
 *
 *   if (usage > 0.8) {
 *     console.warn('High CPU usage detected');
 *   }
 * });
 *
 * @example
 * // Get CPU free percentage
 * getCPUUsage((freePercent) => {
 *   console.log(`CPU free: ${(freePercent * 100).toFixed(1)}%`);
 * }, true);
 *
 * @example
 * // Performance monitoring loop
 * setInterval(() => {
 *   getCPUUsage((usage) => {
 *     const percent = (usage * 100).toFixed(1);
 *     console.log(`[${new Date().toISOString()}] CPU: ${percent}%`);
 *   });
 * }, 5000);
 *
 * @since 1.0.0
 * @see {@link cpuUsage} - Convenience function for CPU usage
 * @see {@link cpuFree} - Convenience function for CPU free percentage
 */
export function getCPUUsage(callback: AnyCallbackFunc, free?: boolean) {
  const stats1 = getCPUInfo();
  const startIdle = stats1.idle;
  const startTotal = stats1.total;

  setTimeout(function () {
    const stats2 = getCPUInfo();
    const endIdle = stats2.idle;
    const endTotal = stats2.total;

    const idle = endIdle - startIdle;
    const total = endTotal - startTotal;
    const perc = idle / total;

    if (free === true) callback(perc);
    else callback(1 - perc);
  }, 1000);
}

/**
 * @function cpuFree
 * @description 获取CPU空闲百分比（十进制0-1）。Gets CPU free percentage as a decimal value between 0 and 1 for capacity monitoring.
 * @param {AnyCallbackFunc} callback - 接收CPU空闲百分比（0-1）的回调函数。Callback function receiving free CPU percentage (0-1)
 * @example
 * // Monitor available CPU capacity
 * cpuFree((freePercent) => {
 *   console.log(`Available CPU: ${(freePercent * 100).toFixed(1)}%`);
 *
 *   if (freePercent < 0.2) {
 *     console.warn('CPU capacity low - consider load balancing');
 *   }
 * });
 *
 * @example
 * // Adaptive processing based on CPU availability
 * cpuFree((available) => {
 *   const maxConcurrency = Math.floor(available * 10);
 *   console.log(`Setting concurrency to ${maxConcurrency} based on CPU availability`);
 * });
 *
 * @since 1.0.0
 * @see {@link getCPUUsage} - Base CPU monitoring function
 * @see {@link cpuUsage} - Get CPU usage percentage
 */
export function cpuFree(callback: AnyCallbackFunc) {
  getCPUUsage(callback, true);
}

/**
 * @function cpuUsage
 * @description 获取CPU使用率百分比（十进制0-1）。Gets CPU usage percentage as a decimal value between 0 and 1 for performance monitoring.
 * @param {AnyCallbackFunc} callback - 接收CPU使用率百分比（0-1）的回调函数。Callback function receiving CPU usage percentage (0-1)
 * @example
 * // Basic CPU monitoring
 * cpuUsage((usage) => {
 *   const percent = (usage * 100).toFixed(1);
 *   console.log(`CPU usage: ${percent}%`);
 *
 *   if (usage > 0.9) {
 *     console.error('Critical CPU usage!');
 *   } else if (usage > 0.7) {
 *     console.warn('High CPU usage detected');
 *   }
 * });
 *
 * @example
 * // Performance-based throttling
 * cpuUsage((usage) => {
 *   if (usage > 0.8) {
 *     console.log('Throttling operations due to high CPU usage');
 *     // Implement throttling logic
 *   }
 * });
 *
 * @since 1.0.0
 * @see {@link getCPUUsage} - Base CPU monitoring function
 * @see {@link cpuFree} - Get CPU free percentage
 */
export function cpuUsage(callback: AnyCallbackFunc) {
  getCPUUsage(callback, false);
}

/**
 * @function getCPUInfo
 * @description 获取所有核心的当前CPU时间信息。Gets current CPU timing information across all cores for detailed performance analysis.
 * @returns {{idle: number, total: number}} 包含空闲和总系统时间的对象。Object containing idle and total CPU time
 * @example
 * // Get raw CPU timing data
 * const cpuInfo = getCPUInfo();
 * const usagePercent = ((cpuInfo.total - cpuInfo.idle) / cpuInfo.total) * 100;
 * console.log(`Instantaneous CPU usage: ${usagePercent.toFixed(1)}%`);
 *
 * @example
 * // Calculate CPU usage over time
 * const start = getCPUInfo();
 * setTimeout(() => {
 *   const end = getCPUInfo();
 *   const idleDiff = end.idle - start.idle;
 *   const totalDiff = end.total - start.total;
 *   const usage = 1 - (idleDiff / totalDiff);
 *   console.log(`CPU usage over 1 second: ${(usage * 100).toFixed(1)}%`);
 * }, 1000);
 *
 * @since 1.0.0
 * @see {@link getCPUUsage} - Higher-level CPU usage monitoring
 * @see {@link https://nodejs.org/api/os.html#os_os_cpus} - Node.js os.cpus() documentation
 */
export function getCPUInfo() {
  const cpus = os.cpus();

  let user = 0;
  let nice = 0;
  let sys = 0;
  let idle = 0;
  let irq = 0;

  for (const cpu in cpus) {
    user += cpus[cpu].times.user;
    nice += cpus[cpu].times.nice;
    sys += cpus[cpu].times.sys;
    irq += cpus[cpu].times.irq;
    idle += cpus[cpu].times.idle;
  }

  const total = user + nice + sys + idle + irq;

  return {
    idle: idle,
    total: total,
  };
}

export default {
  platform,
  cpuCount,
  sysUptime,
  processUptime,
  freemem,
  totalmem,
  freememPercentage,
  freeCommand,
  harddrive,
  getProcesses,
  allLoadavg,
  loadavg,
  cpuFree,
  cpuUsage,
  getCPUUsage,
  getCPUInfo,
};
