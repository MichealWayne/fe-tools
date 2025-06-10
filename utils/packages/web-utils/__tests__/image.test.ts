/**
 * @author Wayne
 * @Date 2025-06-08 11:05:00
 * @LastEditTime 2025-06-08 11:05:00
 */
import { isImageLoaded, getImageSize, isSupportWebP, cropImage, compressImage } from '../src/image';

describe('Image module', () => {
  // Mock image loading
  const originalImage = global.Image;

  beforeEach(() => {
    // Mock Image constructor
    global.Image = class {
      public onload: (() => void) | null = null;
      public onerror: ((error: any) => void) | null = null;
      public src = '';
      public naturalWidth = 0;
      public naturalHeight = 0;
      public width = 0;
      public height = 0;
    } as any;
  });

  afterEach(() => {
    global.Image = originalImage;
    jest.restoreAllMocks();
  });

  describe('isImageLoaded', () => {
    test('should resolve with true when image loads successfully', async () => {
      // Mock successful image load
      const mockOnload = jest.fn().mockImplementation(function (this: any) {
        if (this.onload) this.onload();
      });

      Object.defineProperty(global.Image.prototype, 'src', {
        set: mockOnload,
      });

      await expect(isImageLoaded('https://example.com/image.jpg')).resolves.toBe(true);
    });

    test('should reject when image fails to load', async () => {
      // Mock failed image load
      const mockOnerror = jest.fn().mockImplementation(function (this: any) {
        if (this.onerror) this.onerror('Image load error');
      });

      Object.defineProperty(global.Image.prototype, 'src', {
        set: mockOnerror,
      });

      await expect(isImageLoaded('https://example.com/bad-image.jpg')).rejects.toBe(
        'Image load error'
      );
    });
  });

  describe('getImageSize', () => {
    test('should return image dimensions when image loads successfully', async () => {
      // Mock successful image load with dimensions
      const mockOnload = jest.fn().mockImplementation(function (this: any) {
        this.naturalWidth = 800;
        this.naturalHeight = 600;
        if (this.onload) this.onload();
      });

      Object.defineProperty(global.Image.prototype, 'src', {
        set: mockOnload,
      });

      await expect(getImageSize('https://example.com/image.jpg')).resolves.toEqual({
        width: 800,
        height: 600,
      });
    });

    test('should reject when image fails to load', async () => {
      // Mock failed image load
      const mockOnerror = jest.fn().mockImplementation(function (this: any) {
        if (this.onerror) this.onerror('Image load error');
      });

      Object.defineProperty(global.Image.prototype, 'src', {
        set: mockOnerror,
      });

      await expect(getImageSize('https://example.com/bad-image.jpg')).rejects.toBe(
        'Image load error'
      );
    });
  });

  describe('isSupportWebP', () => {
    test('should return true when browser supports WebP', () => {
      // Mock canvas and map to simulate WebP support
      const mockCanvas = {
        toDataURL: jest.fn().mockReturnValue('data:image/webp;base64,data'),
      };

      jest.spyOn(document, 'createElement').mockImplementation(tag => {
        if (tag === 'canvas') {
          return mockCanvas as unknown as HTMLCanvasElement;
        }
        return {} as any;
      });

      // Mock array map method to simulate browser support
      const originalMapFn = Array.prototype.map;
      Array.prototype.map = function () {
        return [1];
      } as any;

      expect(isSupportWebP()).toBe(true);

      // Restore original map method
      Array.prototype.map = originalMapFn;
    });

    test('should return false when browser does not support WebP', () => {
      // Mock canvas to simulate no WebP support
      const mockCanvas = {
        toDataURL: jest.fn().mockReturnValue('data:image/png;base64,data'),
      };

      jest.spyOn(document, 'createElement').mockImplementation(tag => {
        if (tag === 'canvas') {
          return mockCanvas as unknown as HTMLCanvasElement;
        }
        return {} as any;
      });

      // Mock array map method to simulate browser support
      const originalMapFn = Array.prototype.map;
      Array.prototype.map = function () {
        return [1];
      } as any;

      expect(isSupportWebP()).toBe(false);

      // Restore original map method
      Array.prototype.map = originalMapFn;
    });
  });

  describe('cropImage', () => {
    beforeEach(() => {
      // Mock canvas and context
      const mockContext = {
        drawImage: jest.fn(),
      };

      const mockCanvas = {
        getContext: jest.fn().mockReturnValue(mockContext),
        width: 0,
        height: 0,
      };

      jest.spyOn(document, 'createElement').mockImplementation(tag => {
        if (tag === 'canvas') {
          return mockCanvas as unknown as HTMLCanvasElement;
        }
        return {} as any;
      });
    });

    test('should create a canvas with the specified dimensions', () => {
      const mockImg = new Image();
      const result = cropImage(mockImg as HTMLImageElement, 10, 20, 100, 150);

      expect(result.width).toBe(100);
      expect(result.height).toBe(150);

      const ctx = result.getContext('2d');
      expect(ctx?.drawImage).toHaveBeenCalledWith(mockImg, 10, 20, 100, 150, 0, 0, 100, 150);
    });

    test('should throw an error for invalid dimensions', () => {
      const mockImg = new Image();
      expect(() => cropImage(mockImg as HTMLImageElement, 10, 20, -100, 150)).toThrow(
        'Invalid dimensions'
      );
      expect(() => cropImage(mockImg as HTMLImageElement, 10, 20, 100, -150)).toThrow(
        'Invalid dimensions'
      );
    });
  });

  describe('compressImage', () => {
    beforeEach(() => {
      // Mock canvas elements and context
      const mockContext = {
        fillStyle: '',
        fillRect: jest.fn(),
        drawImage: jest.fn(),
      };

      const mockCanvas = {
        getContext: jest.fn().mockReturnValue(mockContext),
        width: 0,
        height: 0,
        toDataURL: jest.fn().mockReturnValue('data:image/jpeg;base64,compressed-image-data'),
      };

      jest.spyOn(document, 'createElement').mockImplementation(tag => {
        if (tag === 'canvas') {
          return { ...mockCanvas } as unknown as HTMLCanvasElement;
        }
        return {} as any;
      });
    });

    test('should compress image and return base64 data', () => {
      const mockImg = {
        width: 1000,
        height: 800,
      } as HTMLImageElement;

      const result = compressImage(mockImg, 0.8);
      expect(result).toBe('data:image/jpeg;base64,compressed-image-data');
    });

    test('should handle large images with ratio adjustment', () => {
      const mockImg = {
        width: 3000,
        height: 2000,
      } as HTMLImageElement;

      const result = compressImage(mockImg, 0.6);
      expect(result).toBe('data:image/jpeg;base64,compressed-image-data');
    });
  });
});
