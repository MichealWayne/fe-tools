import { forceRunAsync, runAsync, runSync, runPromise } from '../src/process/run';

describe('run helpers', () => {
  it('should ignore failure in forceRunAsync', async () => {
    const node = process.execPath;
    await expect(forceRunAsync(node, ['-e', 'process.exit(1)'])).resolves.toBeDefined();
  });

  it('should reject on timeout only once', async () => {
    const node = process.execPath;
    await expect(
      runAsync(node, ['-e', 'setTimeout(() => {}, 2000)'], { timeout: 50 })
    ).rejects.toThrow('timed out');
  });

  it('should run sync commands', () => {
    const result = runSync(process.execPath, ['-e', 'console.log("ok")']);
    expect(result.success).toBe(true);
    expect(result.stdout).toContain('ok');
  });

  it('should report sync command failures', () => {
    const result = runSync(process.execPath, ['-e', 'process.exit(2)']);
    expect(result.success).toBe(false);
    expect(result.code).toBe(2);
  });

  it('runPromise should exit on rejection', async () => {
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation((() => {
      throw new Error('exit');
    }) as any);
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await expect(runPromise(Promise.reject(new Error('boom')))).rejects.toThrow('exit');
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(errorSpy).toHaveBeenCalled();

    exitSpy.mockRestore();
    errorSpy.mockRestore();
  });
});
