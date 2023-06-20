/**
 * @module os
 * @Date 2020-08-20 21:55:46
 * @LastEditTime 2023-03-14 10:53:15
 */

import os from 'os';
import childrenProcess from 'child_process';

type AnyCallbackFunc = (...args: unknown[]) => any;

/**
 * @function platform
 * @description 获取当前宿主平台标识
 * @return {String} NodeJS.Platform
 */
export function platform() {
  return process.platform;
}

/**
 * @function cpuCount
 * @description 获取当前CPU数量
 * @return {Number}
 */
export function cpuCount() {
  return os.cpus().length;
}

/**
 * @function sysUptime
 * @description 获取系统正常运行时间(单位为秒)
 * @return {Number}
 */
export function sysUptime() {
  // unit: second
  return os.uptime();
}

/**
 * @function processUptime
 * @description 获取Node程序已运行的时间(单位为秒)
 * @return {Number}
 */
export function processUptime() {
  // unit: second
  return process.uptime();
}

/**
 * @function freemem
 * @description 获取空余内存(Mb)
 * @return {Number}
 */
export function freemem() {
  return os.freemem() / (1024 * 1024);
}

/**
 * @function totalmem
 * @description 获取总内存(Mb)
 * @returns {Number}
 */
export function totalmem() {
  return os.totalmem() / (1024 * 1024);
}

/**
 * @function freememPercentage
 * @description 获取空余内存比
 * @returns {Number}
 */
export function freememPercentage() {
  return os.freemem() / os.totalmem();
}

/**
 * @function freeCommand
 * @description Linux free命令，显示内存情况并回调
 * @param {AnyCallbackFunc} callback
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
 * @description 获取硬盘使用情况并回调
 * @param {AnyCallbackFunc} callback
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
 * @description 获取进程运行情况
 * @param nProcess
 * @param callback
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

/*
 * Returns All the load average usage for 1, 5 or 15 minutes.
 */
export function allLoadavg() {
  const loads = os.loadavg();

  return loads[0].toFixed(4) + ',' + loads[1].toFixed(4) + ',' + loads[2].toFixed(4);
}

/**
 * @function loadavg
 * @description Returns the load average usage for 1, 5 or 15 minutes.
 * @param {Number} time
 * @returns
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
 * @description 获取CPU使用情况
 * @param callback
 * @param {Boolean} free
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
 * @description cpu空闲比例（0～1）
 * @param callback
 */
export function cpuFree(callback: AnyCallbackFunc) {
  getCPUUsage(callback, true);
}

/**
 * @function cpuUsage
 * @description cpu已使用比例（0～1）
 * @param callback
 */
export function cpuUsage(callback: AnyCallbackFunc) {
  getCPUUsage(callback, false);
}

/**
 * @function getCPUInfo
 * @description 获取CPU情况
 * @returns
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
