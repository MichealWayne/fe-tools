import fs from 'fs';
import path from 'path';
import Cache from '../src/cache';

describe('Cache', () => {
  const tempDir = path.join(__dirname, 'tmp-cache');

  afterEach(async () => {
    if (fs.existsSync(tempDir)) {
      await fs.promises.rm(tempDir, { recursive: true, force: true });
    }
  });

  it('should return cached falsy values', async () => {
    fs.mkdirSync(tempDir, { recursive: true });
    const cache = new Cache(tempDir);
    cache.enable();

    await cache.write('falsy', '.json', false);
    const cached = cache.get('falsy', '.json');

    expect(cached).toBe(false);
  });

  it('should reuse a synchronous result while its disk write is pending', async () => {
    fs.mkdirSync(tempDir, { recursive: true });
    const cache = new Cache(tempDir);
    cache.enable();
    let finishWrite: (() => void) | undefined;
    jest.spyOn(cache, 'write').mockImplementation(
      () => new Promise<boolean | undefined>(resolve => {
        finishWrite = () => resolve(true);
      })
    );
    const original = jest.fn((value: unknown) => ({ result: Number(value) * 2 }));
    const cachedCalculation = cache.wrapNormal(
      original,
      value => ({ key: `value-${String(value)}`, ext: '.json' })
    );

    expect(cachedCalculation(4)).toEqual({ result: 8 });
    expect(cachedCalculation(4)).toEqual({ result: 8 });
    expect(original).toHaveBeenCalledTimes(1);

    finishWrite?.();
    await Promise.resolve();
  });

  it('should log cache write failures from the synchronous wrapper', async () => {
    fs.mkdirSync(tempDir, { recursive: true });
    const cache = new Cache(tempDir);
    cache.enable();
    jest.spyOn(cache, 'write').mockRejectedValue(new Error('disk full'));
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const cachedCalculation = cache.wrapNormal(
      () => ({ result: 1 }),
      () => ({ key: 'write-failure', ext: '.json' })
    );

    expect(cachedCalculation()).toEqual({ result: 1 });
    await Promise.resolve();
    await Promise.resolve();
    expect(consoleError).toHaveBeenCalledWith(
      'Failed to write cache entry write-failure.json:',
      expect.any(Error)
    );
    consoleError.mockRestore();
  });
});
