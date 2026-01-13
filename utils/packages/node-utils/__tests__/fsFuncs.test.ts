import fs from 'fs';
import path from 'path';
import {
  travelFolderSync,
  mkdirsSync,
  fsExistsSync,
  setFolderSync,
  rmdirsSync,
  writeJson,
  readFileSync,
  readJsonFile,
  writeFile,
} from '../src/fs/fsFuncs';

describe('writeFile', () => {
  const tempDir = path.join(__dirname, 'tmp-fs');
  const filePath = path.join(tempDir, 'empty.txt');
  const tempDirRelative = path.relative(process.cwd(), tempDir);

  beforeEach(() => {
    fs.mkdirSync(tempDir, { recursive: true });
  });

  afterEach(async () => {
    if (fs.existsSync(tempDir)) {
      await fs.promises.rm(tempDir, { recursive: true, force: true });
    }
    if (fs.existsSync(tempDirRelative)) {
      await fs.promises.rm(tempDirRelative, { recursive: true, force: true });
    }
  });

  it('should write empty string content', async () => {
    await writeFile(filePath, '');
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toBe('');
  });

  it('should write and read JSON files', async () => {
    const jsonPath = path.join(tempDir, 'data.json');
    await writeJson(jsonPath, { a: 1 });
    expect(readJsonFile(jsonPath)).toEqual({ a: 1 });
    expect(readFileSync(jsonPath)).toContain('"a": 1');
  });

  it('should create nested directories', () => {
    const nestedDir = path.join(tempDirRelative, 'a', 'b');
    expect(mkdirsSync(nestedDir)).toBe(true);
    expect(fs.existsSync(nestedDir)).toBe(true);
  });

  it('should check existence of paths', () => {
    const exists = fsExistsSync(tempDir);
    expect(exists).toBe(true);
    expect(fsExistsSync(path.join(tempDir, 'nope'))).toBe(false);
  });

  it('should ensure folder exists', () => {
    const target = path.join(tempDirRelative, 'ensure');
    setFolderSync(target, true);
    expect(fs.existsSync(target)).toBe(true);
  });

  it('should traverse folders and collect files', () => {
    const nestedDir = path.join(tempDir, 'nested');
    const fileA = path.join(nestedDir, 'a.txt');
    fs.mkdirSync(nestedDir, { recursive: true });
    fs.writeFileSync(fileA, 'hi');

    const files: string[] = [];
    const folders: string[] = [];
    travelFolderSync(tempDir, pathName => pathName && files.push(pathName), pathName => pathName && folders.push(pathName));

    expect(files.some(item => item.endsWith('a.txt'))).toBe(true);
    expect(folders.some(item => item.endsWith('nested'))).toBe(true);
  });

  it('should remove directories recursively', () => {
    const nestedDir = path.join(tempDir, 'remove-me', 'inner');
    fs.mkdirSync(nestedDir, { recursive: true });
    fs.writeFileSync(path.join(nestedDir, 'file.txt'), 'bye');

    expect(rmdirsSync(path.join(tempDir, 'remove-me'))).toBe(true);
    expect(fs.existsSync(path.join(tempDir, 'remove-me'))).toBe(false);
  });
});
