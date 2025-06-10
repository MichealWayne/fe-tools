import fs from 'fs';
import path from 'path';
import getImgList from '../src/getImgList';

// 模拟 fs 模块
jest.mock('fs');

describe('getImgList function', () => {
  const mockFs = fs as jest.Mocked<typeof fs>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return empty array for non-existent directory', () => {
    mockFs.existsSync.mockReturnValue(false);

    const result = getImgList('/fake/path');

    expect(result).toEqual([]);
    expect(mockFs.existsSync).toHaveBeenCalledWith('/fake/path');
  });

  it('should filter 2x images by default', () => {
    const mockFiles = ['image_2x.jpg', 'image.jpg', 'another_2x.png', 'not_image.txt'];

    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockReturnValue(mockFiles as any);
    mockFs.statSync.mockImplementation(
      () =>
        ({
          isDirectory: () => false,
        } as fs.Stats)
    );

    const result = getImgList('/test/path', { only2x: true });

    expect(result).toEqual(['image_2x.jpg', 'another_2x.png']);
    expect(mockFs.readdirSync).toHaveBeenCalledWith('/test/path', 'utf-8');
  });

  it('should include all images when includeAllImages is true', () => {
    const mockFiles = ['image_2x.jpg', 'image.jpg', 'another_2x.png', 'not_image.txt'];

    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockReturnValue(mockFiles as any);
    mockFs.statSync.mockImplementation(
      () =>
        ({
          isDirectory: () => false,
        } as fs.Stats)
    );

    const result = getImgList('/test/path', { includeAllImages: true });

    expect(result).toEqual(['image_2x.jpg', 'image.jpg', 'another_2x.png']);
    expect(mockFs.readdirSync).toHaveBeenCalledWith('/test/path', 'utf-8');
  });

  it('should filter by extensions when provided', () => {
    const mockFiles = ['image.jpg', 'image.png', 'image.webp', 'image.txt'];

    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockReturnValue(mockFiles as any);
    mockFs.statSync.mockImplementation(
      () =>
        ({
          isDirectory: () => false,
        } as fs.Stats)
    );

    const result = getImgList('/test/path', {
      includeAllImages: true,
      extensions: ['jpg', 'png'],
    });

    expect(result).toEqual(['image.jpg', 'image.png']);
  });

  it('should search recursively when recursive option is true', () => {
    // Setup directory structure
    const rootFiles = ['image_2x.jpg', 'subfolder'];
    const subfolderFiles = ['subimage_2x.png', 'another.jpg'];

    mockFs.existsSync.mockReturnValue(true);
    mockFs.readdirSync.mockImplementation(dirPath => {
      if (dirPath === '/test/path') return rootFiles as any;
      if (dirPath === path.join('/test/path', 'subfolder')) return subfolderFiles as any;
      return [] as any;
    });

    mockFs.statSync.mockImplementation(
      filePath =>
        ({
          isDirectory: () => {
            const basename = path.basename(filePath.toString());
            return basename === 'subfolder';
          },
        } as fs.Stats)
    );

    const result = getImgList('/test/path', {
      only2x: true,
      recursive: true,
    });

    expect(result).toEqual(['image_2x.jpg', 'subfolder/subimage_2x.png']);
    expect(mockFs.readdirSync).toHaveBeenCalledWith('/test/path', 'utf-8');
    expect(mockFs.readdirSync).toHaveBeenCalledWith(path.join('/test/path', 'subfolder'), 'utf-8');
  });
});
