import os from 'os';
import childrenProcess from 'child_process';
import {
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
} from '../src/lib/util/os';

describe('platform', () => {
  it('should return the current platform', () => {
    const result = platform();
    expect(result).toEqual(process.platform);
  });
});

describe('cpuCount', () => {
  it('should return the number of CPUs', () => {
    const result = cpuCount();
    expect(result).toEqual(os.cpus().length);
  });
});

describe('sysUptime', () => {
  it('should return the system uptime in seconds', () => {
    const result = sysUptime();
    expect(result).toEqual(os.uptime());
  });
});

describe('processUptime', () => {
  it('should return the Node program uptime in seconds', () => {
    const result = processUptime();
    expect(result).toEqual(process.uptime());
  });
});

describe('freemem', () => {
  it('should return the amount of free memory in MB', () => {
    const result = freemem();
    expect(result).toEqual(os.freemem() / (1024 * 1024));
  });
});

describe('totalmem', () => {
  it('should return the total amount of memory in MB', () => {
    const result = totalmem();
    expect(result).toEqual(os.totalmem() / (1024 * 1024));
  });
});

describe('freememPercentage', () => {
  it('should return the percentage of free memory', () => {
    const result = freememPercentage();
    expect(result).toEqual(os.freemem() / os.totalmem());
  });
});

describe('freeCommand', () => {
  it('should execute the "free -m" command and invoke the callback with used and cached memory', () => {
    const callback = jest.fn();
    const stdout =
      '             total       used       free     shared    buffers     cached\nMem:          8000       4000       4000          0          0       2000\n-/+ buffers/cache:       2000       6000\nSwap:         2000          0       2000\n';
    childrenProcess.exec = jest.fn((command, cb) => {
      cb(null, stdout);
    });

    freeCommand(callback);

    expect(childrenProcess.exec).toHaveBeenCalledWith('free -m', expect.any(Function));
    expect(callback).toHaveBeenCalledWith(2000, 2000);
  });
});

describe('harddrive', () => {
  it('should execute the "df -k" command and invoke the callback with total, free, and used disk space', () => {
    const callback = jest.fn();
    const stdout =
      'Filesystem     1K-blocks    Used Available Use% Mounted on\n/dev/sda1       10239876 1234567   9000000  14% /\n';
    childrenProcess.exec = jest.fn((command, cb) => {
      cb(null, stdout);
    });

    harddrive(callback);

    expect(childrenProcess.exec).toHaveBeenCalledWith('df -k', expect.any(Function));
    expect(callback).toHaveBeenCalledWith(9000000, 9000000 - 1234567, 1234567);
  });
});

describe('getProcesses', () => {
  it('should execute the "ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n 10" command and invoke the callback with the process information', () => {
    const callback = jest.fn();
    const stdout =
      ' 0.0  0.0 00:00:00 /usr/lib/systemd/systemd --switched-root --system --deserialize 21\n 0.0  0.0 00:00:00 [kthreadd]\n';
    childrenProcess.exec = jest.fn((command, cb) => {
      cb(null, stdout);
    });

    getProcesses(10, callback);

    expect(childrenProcess.exec).toHaveBeenCalledWith(
      'ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n 11',
      expect.any(Function)
    );
    expect(callback).toHaveBeenCalledWith(
      '0.0  0.0 00:00:00 /usr/lib/systemd/systemd --switched-root --system --deserialize 21\n0.0  0.0 00:00:00 [kthreadd]\n'
    );
  });

  it('should execute the "ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n 11" command and invoke the callback with the process information', () => {
    const callback = jest.fn();
    const stdout =
      ' 0.0  0.0 00:00:00 /usr/lib/systemd/systemd --switched-root --system --deserialize 21\n 0.0  0.0 00:00:00 [kthreadd]\n';
    childrenProcess.exec = jest.fn((command, cb) => {
      cb(null, stdout);
    });

    getProcesses(callback);

    expect(childrenProcess.exec).toHaveBeenCalledWith(
      'ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n 10',
      expect.any(Function)
    );
    expect(callback).toHaveBeenCalledWith(
      '0.0  0.0 00:00:00 /usr/lib/systemd/systemd --switched-root --system --deserialize 21\n0.0  0.0 00:00:00 [kthreadd]\n'
    );
  });
});

describe('allLoadavg', () => {
  it('should return the load average usage for 1, 5, and 15 minutes', () => {
    const loads = os.loadavg();
    const result = allLoadavg();
    expect(result).toEqual(
      loads[0].toFixed(4) + ',' + loads[1].toFixed(4) + ',' + loads[2].toFixed(4)
    );
  });
});

describe('loadavg', () => {
  it('should return the load average usage for the specified time', () => {
    const loads = os.loadavg();
    let time = 1;
    let v = loads[0];
    let result = loadavg(time);
    expect(result).toEqual(v);

    time = 5;
    v = loads[1];
    result = loadavg(time);
    expect(result).toEqual(v);

    time = 15;
    v = loads[2];
    result = loadavg(time);
    expect(result).toEqual(v);
  });

  it('should default to 1 minute if an invalid time is specified', () => {
    const loads = os.loadavg();
    const time = 10;
    const v = loads[0];
    const result = loadavg(time);
    expect(result).toEqual(v);
  });
});

describe('getCPUUsage', () => {
  it('should calculate the CPU usage and invoke the callback with the result', () => {
    const callback = jest.fn();
    const stats1 = { idle: 100, total: 200 };
    const stats2 = { idle: 50, total: 250 };
    getCPUInfo = jest.fn().mockReturnValueOnce(stats1).mockReturnValueOnce(stats2);

    getCPUUsage(callback);

    expect(getCPUInfo).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(0.5);
  });

  it('should calculate the CPU usage and invoke the callback with the result when free is true', () => {
    const callback = jest.fn();
    const stats1 = { idle: 100, total: 200 };
    const stats2 = { idle: 50, total: 250 };
    getCPUInfo = jest.fn().mockReturnValueOnce(stats1).mockReturnValueOnce(stats2);

    getCPUUsage(callback, true);

    expect(getCPUInfo).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(0.5);
  });
});

describe('cpuFree', () => {
  it('should calculate the CPU free percentage and invoke the callback with the result', () => {
    const callback = jest.fn();
    const stats1 = { idle: 100, total: 200 };
    const stats2 = { idle: 50, total: 250 };
    getCPUInfo = jest.fn().mockReturnValueOnce(stats1).mockReturnValueOnce(stats2);

    cpuFree(callback);

    expect(getCPUInfo).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(0.5);
  });
});

describe('cpuUsage', () => {
  it('should calculate the CPU usage percentage and invoke the callback with the result', () => {
    const callback = jest.fn();
    const stats1 = { idle: 100, total: 200 };
    const stats2 = { idle: 50, total: 250 };
    getCPUInfo = jest.fn().mockReturnValueOnce(stats1).mockReturnValueOnce(stats2);

    cpuUsage(callback);

    expect(getCPUInfo).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(0.5);
  });
});

describe('getCPUInfo', () => {
  it('should return the CPU information', () => {
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
    const result = getCPUInfo();
    expect(result).toEqual({ idle, total });
  });
});
