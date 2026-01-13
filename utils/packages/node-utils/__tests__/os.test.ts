import os from 'os';
import childrenProcess from 'child_process';
import * as osUtils from '../src/system/os';

// Mock setup
beforeEach(() => {
  // Reset mocks between tests
  jest.clearAllMocks();
});

// Create a properly typed mock for exec
const mockExec = jest.fn() as jest.Mock & { __promisify__: any };
mockExec.__promisify__ = jest.fn();

describe('platform', () => {
  it('should return the current platform', () => {
    const result = osUtils.platform();
    expect(result).toEqual(process.platform);
  });
});

describe('cpuCount', () => {
  it('should return the number of CPUs', () => {
    const result = osUtils.cpuCount();
    expect(result).toEqual(os.cpus().length);
  });
});

describe('sysUptime', () => {
  it('should return the system uptime in seconds', () => {
    const result = osUtils.sysUptime();
    expect(result).toEqual(os.uptime());
  });
});

describe('processUptime', () => {
  it('should return the Node program uptime in seconds', () => {
    const result = osUtils.processUptime();
    expect(Math.abs(result - process.uptime())).toBeLessThan(0.1);
  });
});

describe('freemem', () => {
  it('should return the amount of free memory in MB', () => {
    const result = osUtils.freemem();
    expect(result).toEqual(os.freemem() / (1024 * 1024));
  });
});

describe('totalmem', () => {
  it('should return the total amount of memory in MB', () => {
    const result = osUtils.totalmem();
    expect(result).toEqual(os.totalmem() / (1024 * 1024));
  });
});

describe('freememPercentage', () => {
  it('should return the percentage of free memory', () => {
    const result = osUtils.freememPercentage();
    expect(result).toEqual(os.freemem() / os.totalmem());
  });
});

describe('freeCommand', () => {
  it('should execute the "free -m" command and invoke the callback with used and cached memory', () => {
    const callback = jest.fn();
    if (process.platform !== 'linux') {
      osUtils.freeCommand(callback);
      expect(callback).toHaveBeenCalledWith(null, null);
      return;
    }
    const stdout =
      '             total       used       free     shared    buffers     cached\nMem:          8000       4000       4000          0          0       2000\n-/+ buffers/cache:       2000       6000\nSwap:         2000          0       2000\n';

    // Use the properly typed mock
    childrenProcess.exec = mockExec;
    mockExec.mockImplementation((command, cb) => {
      cb(null, stdout);
    });

    osUtils.freeCommand(callback);

    expect(childrenProcess.exec).toHaveBeenCalledWith('free -m', expect.any(Function));
    expect(callback).toHaveBeenCalledWith(2000, 2000);
  });
});

describe('harddrive', () => {
  it('should execute the "df -k" command and invoke the callback with total, free, and used disk space', () => {
    const callback = jest.fn();
    if (process.platform === 'win32') {
      osUtils.harddrive(callback);
      expect(callback).toHaveBeenCalledWith(null, null, null);
      return;
    }
    const stdout =
      'Filesystem     1K-blocks    Used Available Use% Mounted on\n/dev/sda1       10239876 1234567   9000000  14% /\n';

    // Use the properly typed mock
    childrenProcess.exec = mockExec;
    mockExec.mockImplementation((command, cb) => {
      cb(null, stdout);
    });

    osUtils.harddrive(callback);

    expect(childrenProcess.exec).toHaveBeenCalledWith('df -k', expect.any(Function));
    expect(callback).toHaveBeenCalledWith(10000, 8790, 1206);
  });
});

describe('getProcesses', () => {
  it('should execute the "ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n 10" command and invoke the callback with the process information', () => {
    const callback = jest.fn();
    if (process.platform === 'win32') {
      (osUtils.getProcesses as any)(callback);
      expect(callback).toHaveBeenCalledWith('');
      return;
    }
    const stdout =
      ' 0.0  0.0 00:00:00 /usr/lib/systemd/systemd --switched-root --system --deserialize 21\n 0.0  0.0 00:00:00 [kthreadd]\n';

    // Use the properly typed mock
    childrenProcess.exec = mockExec;
    mockExec.mockImplementation((command, cb) => {
      cb(null, stdout);
    });

    osUtils.getProcesses(10, callback);

    expect(childrenProcess.exec).toHaveBeenCalledWith(
      'ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n 11',
      expect.any(Function)
    );
    expect(callback).toHaveBeenCalledWith(
      '0.0 0.0 00:00:00 [kthreadd]\n'
    );
  });

  it('should execute the default process command and invoke the callback with the process information', () => {
    const callback = jest.fn();
    if (process.platform === 'win32') {
      (osUtils.getProcesses as any)(callback);
      expect(callback).toHaveBeenCalledWith('');
      return;
    }
    const stdout =
      ' 0.0  0.0 00:00:00 /usr/lib/systemd/systemd --switched-root --system --deserialize 21\n 0.0  0.0 00:00:00 [kthreadd]\n';

    // Use the properly typed mock
    childrenProcess.exec = mockExec;
    mockExec.mockImplementation((command, cb) => {
      cb(null, stdout);
    });

    (osUtils.getProcesses as any)(callback);

    expect(childrenProcess.exec).toHaveBeenCalledWith(
      'ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n 10',
      expect.any(Function)
    );
    expect(callback).toHaveBeenCalledWith(
      '0.0 0.0 00:00:00 [kthreadd]\n'
    );
  });
});

describe('allLoadavg', () => {
  it('should return the load average usage for 1, 5, and 15 minutes', () => {
    const loads = os.loadavg();
    const result = osUtils.allLoadavg();
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
    let result = osUtils.loadavg(time);
    expect(result).toEqual(v);

    time = 5;
    v = loads[1];
    result = osUtils.loadavg(time);
    expect(result).toEqual(v);

    time = 15;
    v = loads[2];
    result = osUtils.loadavg(time);
    expect(result).toEqual(v);
  });

  it('should default to 1 minute if an invalid time is specified', () => {
    const loads = os.loadavg();
    const time = 10;
    const v = loads[0];
    const result = osUtils.loadavg(time);
    expect(result).toEqual(v);
  });
});

describe('getCPUUsage', () => {
  it('should calculate the CPU usage and invoke the callback with the result', () => {
    const callback = jest.fn();
    jest.useFakeTimers();

    osUtils.getCPUUsage(callback);
    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalled();
    const usage = callback.mock.calls[0][0];
    expect(Number.isNaN(usage) || (usage >= 0 && usage <= 1)).toBe(true);
    jest.useRealTimers();
  });

  it('should calculate the CPU usage and invoke the callback with the result when free is true', () => {
    const callback = jest.fn();
    jest.useFakeTimers();

    osUtils.getCPUUsage(callback, true);
    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalled();
    const freePercent = callback.mock.calls[0][0];
    expect(Number.isNaN(freePercent) || (freePercent >= 0 && freePercent <= 1)).toBe(true);
    jest.useRealTimers();
  });
});

describe('cpuFree', () => {
  it('should calculate the CPU free percentage and invoke the callback with the result', () => {
    const callback = jest.fn();
    jest.useFakeTimers();

    osUtils.cpuFree(callback);
    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalled();
    const freePercent = callback.mock.calls[0][0];
    expect(Number.isNaN(freePercent) || (freePercent >= 0 && freePercent <= 1)).toBe(true);
    jest.useRealTimers();
  });
});

describe('cpuUsage', () => {
  it('should calculate the CPU usage percentage and invoke the callback with the result', () => {
    const callback = jest.fn();
    jest.useFakeTimers();

    osUtils.cpuUsage(callback);
    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalled();
    const usage = callback.mock.calls[0][0];
    expect(Number.isNaN(usage) || (usage >= 0 && usage <= 1)).toBe(true);
    jest.useRealTimers();
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
    const result = osUtils.getCPUInfo();
    expect(result).toEqual({ idle, total });
  });
});
