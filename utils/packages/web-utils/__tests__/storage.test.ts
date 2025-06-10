/**
 * @author Wayne
 * @Date 2025-06-08 17:55:17
 * @LastEditTime 2025-06-09 19:18:47
 */
import Storage from '../src/storage';

describe('Storage', () => {
  // Setup mocks for localStorage and sessionStorage
  const mockLocalStorage = (function () {
    let store: Record<string, string> = {};
    return {
      getItem: jest.fn((key: string) => {
        return store[key] || null;
      }),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        store = {};
      }),
      length: 0,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      key: jest.fn((index: number) => ''),
    };
  })();

  const mockSessionStorage = (function () {
    let store: Record<string, string> = {};
    return {
      getItem: jest.fn((key: string) => {
        return store[key] || null;
      }),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        store = {};
      }),
      length: 0,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      key: jest.fn((index: number) => ''),
    };
  })();

  // Save original storage objects
  const originalLocalStorage = window.localStorage;
  const originalSessionStorage = window.sessionStorage;

  beforeEach(() => {
    // Setup mocks
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
    Object.defineProperty(window, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true,
    });

    // Clear mocks before each test
    mockLocalStorage.clear();
    mockSessionStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore original storage objects
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true,
    });
    Object.defineProperty(window, 'sessionStorage', {
      value: originalSessionStorage,
      writable: true,
    });
  });

  describe('localStorage', () => {
    it('should set and get a string value', () => {
      const localStore = Storage('local');
      localStore.set('testKey', 'testValue');
      expect(localStore.get('testKey')).toBe('testValue');
    });

    it('should set and get an object value', () => {
      const localStore = Storage('local');
      const testObj = { name: 'Test', value: 42 };
      localStore.set('testKey', testObj);
      expect(localStore.get('testKey')).toEqual(testObj);
    });

    it('should set with default expiration', () => {
      const localStore = Storage('local');
      localStore.set('testKey', 'testValue');

      // Check that setItem was called with a properly structured item
      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(1);
      const setItemArg = mockLocalStorage.setItem.mock.calls[0][1];
      const parsedArg = JSON.parse(setItemArg);

      // Value should be stored correctly
      expect(parsedArg.value).toBe('testValue');

      // Expiration should be approximately 7 days in the future
      const now = Date.now();
      const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
      expect(parsedArg.expiration).toBeGreaterThan(now);
      expect(parsedArg.expiration).toBeLessThanOrEqual(now + oneWeekInMs + 1000); // Add 1 second tolerance
    });

    it('should set with custom expiration', () => {
      const localStore = Storage('local');
      localStore.set('testKey', 'testValue', 3600); // 1 hour

      const setItemArg = mockLocalStorage.setItem.mock.calls[0][1];
      const parsedArg = JSON.parse(setItemArg);

      const now = Date.now();
      const oneHourInMs = 3600 * 1000;
      expect(parsedArg.expiration).toBeGreaterThan(now);
      expect(parsedArg.expiration).toBeLessThanOrEqual(now + oneHourInMs + 1000);
    });

    it('should set with no expiration when expiration is 0', () => {
      const localStore = Storage('local');
      localStore.set('testKey', 'testValue', 0);

      const setItemArg = mockLocalStorage.setItem.mock.calls[0][1];
      const parsedArg = JSON.parse(setItemArg);

      expect(parsedArg.expiration).toBe(0);
    });

    it('should return null for expired items', () => {
      const localStore = Storage('local');

      // Set an already expired item (negative expiration time)
      mockLocalStorage.setItem(
        'expiredKey',
        JSON.stringify({
          value: 'expiredValue',
          expiration: Date.now() - 1000, // 1 second in the past
        })
      );

      expect(localStore.get('expiredKey')).toBeNull();
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('expiredKey');
    });

    it('should remove a specific item', () => {
      const localStore = Storage('local');
      localStore.set('testKey1', 'value1');
      localStore.set('testKey2', 'value2');

      localStore.remove('testKey1');

      expect(localStore.get('testKey1')).toBeNull();
      expect(localStore.get('testKey2')).toBe('value2');
    });

    it('should remove all items when no key is provided', () => {
      const localStore = Storage('local');
      localStore.set('testKey1', 'value1');
      localStore.set('testKey2', 'value2');

      localStore.remove('');

      expect(mockLocalStorage.clear).toHaveBeenCalled();
      expect(localStore.get('testKey1')).toBeNull();
      expect(localStore.get('testKey2')).toBeNull();
    });

    it('should get all items when no key is provided', () => {
      const localStore = Storage('local');
      localStore.set('testKey1', 'value1');
      localStore.set('testKey2', { complex: 'object' });

      // Mock the loop through localStorage
      Object.defineProperty(mockLocalStorage, 'length', { value: 2 });
      Object.defineProperty(mockLocalStorage, 'key', {
        value: (index: number) => (index === 0 ? 'testKey1' : 'testKey2'),
      });

      // Mock for loop on storage object (needed for get() with no key)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      jest.spyOn(Object, 'keys').mockImplementation((_: any) => ['testKey1', 'testKey2']);

      const result = localStore.get();
      expect(result).toEqual({
        testKey1: 'value1',
        testKey2: { complex: 'object' },
      });
    });
  });

  describe('sessionStorage', () => {
    it('should use sessionStorage when specified', () => {
      const sessionStore = Storage('session');
      sessionStore.set('sessionKey', 'sessionValue');

      expect(mockSessionStorage.setItem).toHaveBeenCalled();
      expect(mockLocalStorage.setItem).not.toHaveBeenCalled();

      expect(sessionStore.get('sessionKey')).toBe('sessionValue');
    });

    it('should handle operations separately from localStorage', () => {
      const localStore = Storage('local');
      const sessionStore = Storage('session');

      localStore.set('key', 'localValue');
      sessionStore.set('key', 'sessionValue');

      expect(localStore.get('key')).toBe('localValue');
      expect(sessionStore.get('key')).toBe('sessionValue');

      localStore.remove('key');
      expect(localStore.get('key')).toBeNull();
      expect(sessionStore.get('key')).toBe('sessionValue');
    });
  });

  describe('edge cases', () => {
    it('should handle non-existent keys', () => {
      const store = Storage();
      expect(store.get('nonExistentKey')).toBeNull();
    });

    it('should handle invalid JSON in storage', () => {
      mockLocalStorage.getItem.mockReturnValueOnce('not-valid-json');

      const store = Storage();
      expect(store.get('someKey')).toBeNull();
    });

    it('should default to localStorage if type is not specified', () => {
      const store = Storage();
      store.set('defaultKey', 'defaultValue');

      expect(mockLocalStorage.setItem).toHaveBeenCalled();
      expect(mockSessionStorage.setItem).not.toHaveBeenCalled();
    });
  });
});
