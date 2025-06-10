/**
 * @author Wayne
 * @Date 2025-06-08 11:15:00
 * @LastEditTime 2025-06-08 11:15:00
 */
import { getPrefix, getStyle, getElementSize } from '../src/css';

jest.mock('utils', () => ({
  isUndefined: (val: any) => val === undefined,
}));

describe('CSS module', () => {
  let originalCreateElement: typeof document.createElement;
  let originalGetComputedStyle: typeof window.getComputedStyle;

  beforeEach(() => {
    // Save original implementations
    originalCreateElement = document.createElement;
    originalGetComputedStyle = window.getComputedStyle;

    // Mock defaultView
    Object.defineProperty(document, 'defaultView', {
      value: {
        getComputedStyle: jest.fn().mockImplementation(() => ({
          getPropertyValue: jest.fn().mockImplementation((prop: string) => {
            if (prop === 'width') return '100px';
            if (prop === 'height') return '50px';
            return '';
          }),
        })),
      },
      configurable: true,
    });
  });

  afterEach(() => {
    // Restore original implementations
    document.createElement = originalCreateElement;
    window.getComputedStyle = originalGetComputedStyle;
    jest.restoreAllMocks();
  });

  describe('getPrefix', () => {
    test('should return empty string if transform is supported', () => {
      // Mock div with transform support
      const mockDiv = {
        style: {
          transform: undefined, // Property exists but value is undefined
        },
      };

      document.createElement = jest.fn().mockReturnValue(mockDiv);

      expect(getPrefix()).toBe('');
    });

    test('should return webkit prefix for webkit browsers', () => {
      // Mock div without transform but with webkit support
      const mockDiv = {
        style: {
          // No transform property
          WebkitTransitionProperty: '',
        },
      };

      document.createElement = jest.fn().mockReturnValue(mockDiv);

      expect(getPrefix()).toBe('webkit');
    });

    test('should return o prefix for Opera browsers', () => {
      // Mock div with only O support
      const mockDiv = {
        style: {
          // No transform or webkit properties
          OTransitionProperty: '',
        },
      };

      document.createElement = jest.fn().mockReturnValue(mockDiv);

      expect(getPrefix()).toBe('o');
    });

    test('should return empty string for unsupported browsers', () => {
      // Mock div with no support
      const mockDiv = {
        style: {
          // No supported properties
        },
      };

      document.createElement = jest.fn().mockReturnValue(mockDiv);

      expect(getPrefix()).toBe('');
    });
  });

  describe('getStyle', () => {
    test('should get style from computed style', () => {
      const elem = document.createElement('div');

      // Test with computed style
      expect(getStyle(elem, 'width')).toBe(100);
    });

    test('should get style from currentStyle (IE fallback)', () => {
      // Mock element with currentStyle (IE style)
      const elem = {
        currentStyle: {
          width: '200px',
        },
      };

      expect(getStyle(elem, 'width')).toBe(200);
    });

    test('should return undefined for non-numeric values', () => {
      const elem = document.createElement('div');

      // Mock getPropertyValue to return non-numeric value
      (document.defaultView!.getComputedStyle as jest.Mock).mockImplementationOnce(() => ({
        getPropertyValue: jest.fn().mockReturnValue('auto'),
      }));

      expect(getStyle(elem, 'width')).toBeUndefined();
    });

    test('should handle empty values', () => {
      const elem = document.createElement('div');

      // Mock getPropertyValue to return empty string
      (document.defaultView!.getComputedStyle as jest.Mock).mockImplementationOnce(() => ({
        getPropertyValue: jest.fn().mockReturnValue(''),
      }));

      expect(getStyle(elem, 'width')).toBeUndefined();
    });
  });

  describe('getElementSize', () => {
    test('should get element size from computed style', () => {
      const elem = document.createElement('div');

      expect(getElementSize(elem, 'width')).toBe(100);
      expect(getElementSize(elem, 'height')).toBe(50);
    });

    test('should get element size from currentStyle (IE fallback)', () => {
      // Create mock element with currentStyle (IE style)
      const elem = document.createElement('div');

      // Add currentStyle property to the element
      Object.defineProperty(elem, 'currentStyle', {
        value: {
          width: '200px',
          height: '150px',
        },
        configurable: true,
      });

      expect(getElementSize(elem, 'width')).toBe(200);
      expect(getElementSize(elem, 'height')).toBe(150);
    });

    test('should return 0 for non-numeric values', () => {
      const elem = document.createElement('div');

      // Mock getPropertyValue to return non-numeric value
      (document.defaultView!.getComputedStyle as jest.Mock).mockImplementationOnce(() => ({
        getPropertyValue: jest.fn().mockReturnValue('auto'),
      }));

      expect(getElementSize(elem, 'width')).toBe(0);
    });

    test('should handle empty values', () => {
      const elem = document.createElement('div');

      // Mock getPropertyValue to return empty string
      (document.defaultView!.getComputedStyle as jest.Mock).mockImplementationOnce(() => ({
        getPropertyValue: jest.fn().mockReturnValue(''),
      }));

      expect(getElementSize(elem, 'width')).toBe(0);
    });
  });
});
