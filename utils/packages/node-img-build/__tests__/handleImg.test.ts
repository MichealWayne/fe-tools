import fs from 'fs';
import path from 'path';
import gmConstructor from 'gm';
import { getGmStream, toBase64, resizeImg, toBlurImg, toWebpImg, generate1xFrom2x } from '../src/handleImg';

// 模拟依赖模块
jest.mock('fs');
jest.mock('gm', () => {
  const gm: any = jest.fn();
  gm.subClass = jest.fn(() => gm);
  return gm;
});

describe('Image handling functions', () => {
  const mockFs = fs as jest.Mocked<typeof fs>;
  const mockGm = gmConstructor as jest.MockedFunction<typeof gmConstructor>;
  const mockGmInstance = {
    identify: jest.fn(),
    resize: jest.fn(),
    colors: jest.fn(),
    blur: jest.fn(),
    toBuffer: jest.fn(),
    write: jest.fn(),
    setFormat: jest.fn(),
    quality: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mock GM instance
    mockGm.mockReturnValue(mockGmInstance as any);

    // Default mock for identify
    mockGmInstance.identify.mockImplementation(callback => {
      callback(null, {
        size: { width: 200, height: 100 },
      });
      return mockGmInstance;
    });

    // Default mocks for method chaining
    mockGmInstance.resize.mockReturnValue(mockGmInstance);
    mockGmInstance.colors.mockReturnValue(mockGmInstance);
    mockGmInstance.blur.mockReturnValue(mockGmInstance);
    mockGmInstance.setFormat.mockReturnValue(mockGmInstance);
    mockGmInstance.quality.mockReturnValue(mockGmInstance);
  });

  describe('getGmStream', () => {
    it('should reject if file does not exist', async () => {
      mockFs.existsSync.mockReturnValue(false);

      await expect(getGmStream('/test/path', 'test.jpg')).rejects.toThrow('Image file not found');
    });

    it('should return GM stream and data if file exists', async () => {
      mockFs.existsSync.mockReturnValue(true);

      const result = await getGmStream('/test/path', 'test.jpg');

      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('gmStream');
      expect(result.data.size).toEqual({ width: 200, height: 100 });
      expect(mockGm).toHaveBeenCalledWith(path.join('/test/path', 'test.jpg'));
    });

    it('should reject if identify fails', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockGmInstance.identify.mockImplementation(callback => {
        callback(new Error('Identify failed'), null);
        return mockGmInstance;
      });

      await expect(getGmStream('/test/path', 'test.jpg')).rejects.toThrow('Identify failed');
    });
  });

  describe('toBase64', () => {
    it('should convert image to base64', async () => {
      const mockBuffer = Buffer.from('test image data');
      mockGmInstance.toBuffer.mockImplementation((format, callback) => {
        callback(null, mockBuffer);
        return mockGmInstance;
      });

      const result = await toBase64(mockGmInstance as any, 'jpg');

      expect(result).toEqual(`data:image/jpg;base64,${mockBuffer.toString('base64')}`);
      expect(mockGmInstance.toBuffer).toHaveBeenCalledWith('jpg', expect.any(Function));
    });

    it('should reject if toBuffer fails', async () => {
      mockGmInstance.toBuffer.mockImplementation((format, callback) => {
        callback(new Error('Buffer conversion failed'), null);
        return mockGmInstance;
      });

      await expect(toBase64(mockGmInstance as any, 'jpg')).rejects.toThrow(
        'Buffer conversion failed'
      );
    });

    it('should reject if GM stream is invalid', async () => {
      await expect(toBase64(null as any, 'jpg')).rejects.toThrow('Invalid GM stream provided');
    });
  });

  describe('toWebpImg', () => {
    it('should preserve multi-dot names and strip _2x for output filename', async () => {
      mockFs.existsSync.mockReturnValue(false);
      mockGmInstance.write.mockImplementation((outputPath, callback) => {
        callback(null);
        return mockGmInstance;
      });

      const result = await toWebpImg('/test/path', 'hero.v1_2x.png', '/out/path');

      expect(result).toBe(path.join('/out/path', 'hero.v1.webp'));
      expect(mockFs.mkdirSync).toHaveBeenCalledWith('/out/path', { recursive: true });
      expect(mockGmInstance.setFormat).toHaveBeenCalledWith('webp');
      expect(mockGmInstance.quality).toHaveBeenCalled();
      expect(mockGmInstance.write).toHaveBeenCalledWith(
        path.join('/out/path', 'hero.v1.webp'),
        expect.any(Function)
      );
    });
  });

  describe('resizeImg', () => {
    it('should resize with width and height', () => {
      const result = resizeImg(mockGmInstance as any, 100, 50);

      expect(result).toBe(mockGmInstance);
      expect(mockGmInstance.resize).toHaveBeenCalledWith(100, 50);
    });

    it('should resize with only width', () => {
      const result = resizeImg(mockGmInstance as any, 100);

      expect(result).toBe(mockGmInstance);
      expect(mockGmInstance.resize).toHaveBeenCalledWith(100);
    });

    it('should return false if width is not provided', () => {
      expect(() => resizeImg(mockGmInstance as any, 0)).toThrow(
        'Width must be a positive, finite number'
      );
      expect(mockGmInstance.resize).not.toHaveBeenCalled();
    });

    it('should return false if GM stream is invalid', () => {
      const result = resizeImg(null as any, 100);

      expect(result).toBe(false);
    });

    it('should throw if height is invalid', () => {
      expect(() => resizeImg(mockGmInstance as any, 100, -1)).toThrow(
        'Height must be a positive, finite number'
      );
      expect(mockGmInstance.resize).not.toHaveBeenCalled();
    });
  });

  describe('toBlurImg', () => {
    it('should apply blur with default options', () => {
      const result = toBlurImg(mockGmInstance as any);

      expect(result).toBe(mockGmInstance);
      expect(mockGmInstance.colors).toHaveBeenCalled();
      expect(mockGmInstance.blur).toHaveBeenCalled();
    });

    it('should apply blur with custom options', () => {
      const result = toBlurImg(mockGmInstance as any, {
        color: 16,
        blurRadius: 10,
        blurSigma: 5,
      });

      expect(result).toBe(mockGmInstance);
      expect(mockGmInstance.colors).toHaveBeenCalledWith(16);
      expect(mockGmInstance.blur).toHaveBeenCalledWith(10, 5);
    });

    it('should return false if GM stream is invalid', () => {
      const result = toBlurImg(null as any);

      expect(result).toBe(false);
    });
  });

  describe('generate1xFrom2x', () => {
    it('should reject when image name does not include _2x.', async () => {
      await expect(generate1xFrom2x('/test/path', 'image.png', '/out/path')).rejects.toThrow(
        'Image name must contain _2x.'
      );
    });

    it('should reject when image dimensions are invalid', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockGmInstance.identify.mockImplementation(callback => {
        callback(null, {
          size: { width: 0, height: 0 },
        });
        return mockGmInstance;
      });

      await expect(
        generate1xFrom2x('/test/path', 'image_2x.png', '/out/path')
      ).rejects.toThrow('Could not determine image dimensions');
    });

    it('should generate 1x image and return output path', async () => {
      const handleImgModule = require('../src/handleImg');
      const spy = jest.spyOn(handleImgModule, 'getGmStream').mockResolvedValue({
        data: { size: { width: 200, height: 100 } },
        gmStream: mockGmInstance,
      });

      mockFs.existsSync.mockImplementation((targetPath: any) =>
        targetPath === '/test/path/icon_2x.png'
      );
      mockGmInstance.write.mockImplementation((outputPath, callback) => {
        callback(null);
        return mockGmInstance;
      });

      const result = await generate1xFrom2x('/test/path', 'icon_2x.png', '/out/path');

      expect(mockFs.mkdirSync).toHaveBeenCalledWith('/out/path', { recursive: true });
      expect(mockGmInstance.resize).toHaveBeenCalledWith(100, 50);
      expect(result).toBe(path.join('/out/path', 'icon.png'));
      spy.mockRestore();
    });
  });
});
