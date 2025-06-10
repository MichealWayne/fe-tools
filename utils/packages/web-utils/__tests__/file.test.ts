/**
 * @author Wayne
 * @Date 2025-06-08 11:10:00
 * @LastEditTime 2025-06-08 19:16:22
 */
import {
  readFile,
  readFileAsDataURL,
  downloadFile,
  downloadImageFileByUrl,
  getFileExtension,
} from '../src/file';

describe('File module', () => {
  // Save original implementation
  const originalCreateElement = document.createElement;
  const originalAppendChild = document.body.appendChild;
  const originalRemoveChild = document.body.removeChild;
  const originalCreateObjectURL = URL.createObjectURL;
  const originalRevokeObjectURL = URL.revokeObjectURL;

  beforeEach(() => {
    // Mock FileReader
    global.FileReader = class {
      onload: ((event: any) => void) | null = null;
      onerror: ((event: any) => void) | null = null;
      result: string | ArrayBuffer | null = null;

      readAsText() {
        setTimeout(() => {
          this.result = 'file content';
          this.onload?.({ target: this } as any);
        }, 0);
      }

      readAsDataURL() {
        setTimeout(() => {
          this.result = 'data:text/plain;base64,ZmlsZSBjb250ZW50';
          this.onload?.({ target: this } as any);
        }, 0);
      }
    } as any;

    // Mock URL methods
    URL.createObjectURL = jest.fn().mockReturnValue('blob:mockurl');
    URL.revokeObjectURL = jest.fn();

    // Mock document methods
    const mockAnchor = {
      href: '',
      download: '',
      click: jest.fn(),
    };

    document.createElement = jest.fn().mockImplementation(tag => {
      if (tag === 'a') {
        return mockAnchor as any;
      }
      if (tag === 'canvas') {
        return {
          getContext: () => ({
            drawImage: jest.fn(),
          }),
          width: 0,
          height: 0,
          toBlob: (callback: (blob: Blob | null) => void) => {
            callback(new Blob(['test'], { type: 'image/jpeg' }));
          },
        } as any;
      }
      if (tag === 'img') {
        const img = {
          width: 100,
          height: 100,
          setAttribute: jest.fn(),
          onload: null as any,
          onerror: null as any,
          src: '',
        };

        Object.defineProperty(img, 'src', {
          // eslint-disable-next-line no-unused-vars
          set() {
            setTimeout(() => {
              if (img.onload) img.onload({} as any);
            }, 0);
          },
        });

        return img as any;
      }
      return originalCreateElement.call(document, tag);
    });

    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();

    // Setup timer mocks
    jest.useFakeTimers();
  });

  afterEach(() => {
    // Restore original implementations
    document.createElement = originalCreateElement;
    document.body.appendChild = originalAppendChild;
    document.body.removeChild = originalRemoveChild;
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe('readFile', () => {
    test('should read file content as text', async () => {
      const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
      const content = await readFile(file);
      expect(content).toBe('file content');
    });

    test('should reject when file reading fails', async () => {
      const file = new File(['test content'], 'test.txt', { type: 'text/plain' });

      // Mock file reader to simulate error
      global.FileReader = class {
        onerror: ((event: any) => void) | null = null;

        readAsText() {
          setTimeout(() => {
            if (this.onerror) this.onerror(new Error('File read error'));
          }, 0);
        }
      } as any;

      await expect(readFile(file)).rejects.toEqual(new Error('File read error'));
    });
  });

  describe('readFileAsDataURL', () => {
    test('should read file content as data URL', async () => {
      const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
      const dataURL = await readFileAsDataURL(file);
      expect(dataURL).toBe('data:text/plain;base64,ZmlsZSBjb250ZW50');
    });

    test('should reject when file reading fails', async () => {
      const file = new File(['test content'], 'test.txt', { type: 'text/plain' });

      // Mock file reader to simulate error
      global.FileReader = class {
        onerror: ((event: any) => void) | null = null;

        readAsDataURL() {
          setTimeout(() => {
            if (this.onerror) this.onerror(new Error('File read error'));
          }, 0);
        }
      } as any;

      await expect(readFileAsDataURL(file)).rejects.toEqual(new Error('File read error'));
    });
  });

  describe('downloadFile', () => {
    test('should create a download link and trigger download', () => {
      downloadFile('test content', 'test.txt', 'text/plain');

      expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(document.createElement).toHaveBeenCalledWith('a');
      expect(document.body.appendChild).toHaveBeenCalled();

      const anchor = (document.createElement as jest.Mock).mock.results[0].value;
      expect(anchor.href).toBe('blob:mockurl');
      expect(anchor.download).toBe('test.txt');
      expect(anchor.click).toHaveBeenCalled();

      // Advance timers to check cleanup
      jest.advanceTimersByTime(10);
      expect(document.body.removeChild).toHaveBeenCalledWith(anchor);
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mockurl');
    });
  });

  describe('downloadImageFileByUrl', () => {
    test('should download image from URL', async () => {
      const result = await downloadImageFileByUrl('https://example.com/image.jpg', 'test.jpg');

      expect(result).toBe(true);
      expect(document.createElement).toHaveBeenCalledWith('img');
      expect(document.createElement).toHaveBeenCalledWith('canvas');

      const mockResults = (document.createElement as jest.Mock).mock.results;
      const anchor = mockResults.find(r => r && r.value && r.value.download !== undefined)?.value;

      expect(anchor?.href).toBe('blob:mockurl');
      expect(anchor?.download).toBe('test.jpg');
      expect(anchor?.click).toHaveBeenCalled();
    });

    test('should reject when image loading fails', async () => {
      // Override img mock to simulate error
      (document.createElement as jest.Mock).mockImplementationOnce(tag => {
        if (tag === 'img') {
          const img = {
            setAttribute: jest.fn(),
            onerror: null as any,
            src: '',
          };

          Object.defineProperty(img, 'src', {
            set() {
              setTimeout(() => {
                if (img.onerror) img.onerror(new Error('Image load error'));
              }, 0);
            },
          });

          return img;
        }
        return originalCreateElement.call(document, tag);
      });

      await expect(
        downloadImageFileByUrl('https://example.com/bad-image.jpg', 'test.jpg')
      ).rejects.toEqual(new Error('Image load error'));
    });
  });

  describe('getFileExtension', () => {
    test('should return the file extension in lowercase', () => {
      expect(getFileExtension('file.txt')).toBe('txt');
      expect(getFileExtension('image.PNG')).toBe('png');
      expect(getFileExtension('document.PDF')).toBe('pdf');
    });

    test('should handle files with multiple dots', () => {
      expect(getFileExtension('archive.tar.gz')).toBe('gz');
      expect(getFileExtension('file.name.with.dots.txt')).toBe('txt');
    });

    test('should return empty string for files without extension', () => {
      expect(getFileExtension('file')).toBe('');
      expect(getFileExtension('.file')).toBe('');
      expect(getFileExtension('')).toBe('');
    });
  });
});
