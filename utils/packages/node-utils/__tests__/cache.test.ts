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
});
