import fs from 'fs';
import path from 'path';
import { Transform } from 'stream';
import { copyStream } from '../src/fs/stream';

describe('copyStream', () => {
  const tempDir = path.join(__dirname, 'tmp-stream');
  const sourcePath = path.join(tempDir, 'source.txt');
  const targetPath = path.join(tempDir, 'target.txt');

  beforeEach(() => {
    fs.mkdirSync(tempDir, { recursive: true });
    fs.writeFileSync(sourcePath, 'hello');
  });

  afterEach(async () => {
    if (fs.existsSync(tempDir)) {
      await fs.promises.rm(tempDir, { recursive: true, force: true });
    }
  });

  it('should copy file contents', async () => {
    await copyStream(sourcePath, targetPath);
    expect(fs.readFileSync(targetPath, 'utf8')).toBe('hello');
  });

  it('should copy with transform stream', async () => {
    const upperTransform = new Transform({
      transform(chunk, _encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
      },
    });

    await copyStream(sourcePath, targetPath, { transform: upperTransform });
    expect(fs.readFileSync(targetPath, 'utf8')).toBe('HELLO');
  });
});
