/**
 * @author Wayne
 * @Date 2025-06-08 18:15:17
 * @LastEditTime 2025-06-09 19:18:46
 */
// Mock User-Agent helper function
function mockUserAgent(userAgent: string) {
  const originalNavigator = window.navigator;

  // Create a proxy for navigator to allow property overrides
  const navigatorProxy = new Proxy(originalNavigator, {
    get: (target, prop) => {
      if (prop === 'userAgent') return userAgent;
      if (prop === 'appVersion') return userAgent;
      return Reflect.get(target, prop);
    },
  });

  Object.defineProperty(window, 'navigator', {
    value: navigatorProxy,
    configurable: true,
    writable: true,
  });
}

function loadPlatform() {
  jest.resetModules();
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require('../src/platform') as typeof import('../src/platform');
}

describe('Platform Detection', () => {
  // Save the original navigator
  const originalNavigator = window.navigator;

  afterEach(() => {
    // Restore original navigator after each test
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      configurable: true,
      writable: true,
    });
  });

  describe('isBrowser', () => {
    it('should return true in a browser environment', () => {
      const { isBrowser } = loadPlatform();
      expect(isBrowser()).toBe(true);
    });
  });

  describe('isPC', () => {
    it('should return true for desktop user agents', () => {
      mockUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      );
      const { isPC } = loadPlatform();
      // Need to directly access via window since we've mocked navigator
      expect(window.navigator.userAgent.toLowerCase().indexOf('android')).toBe(-1);
      expect(isPC()).toBe(true);
    });

    it('should return false for mobile user agents', () => {
      mockUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
      );
      let platform = loadPlatform();
      expect(platform.isPC()).toBe(false);

      mockUserAgent(
        'Mozilla/5.0 (Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'
      );
      platform = loadPlatform();
      expect(platform.isPC()).toBe(false);
    });
  });

  describe('getPcExplore', () => {
    it('should detect Chrome browser', () => {
      mockUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      );
      const { getPcExplore } = loadPlatform();
      expect(getPcExplore()).toContain('Chrome');
    });

    it('should detect Firefox browser', () => {
      mockUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0'
      );
      const { getPcExplore } = loadPlatform();
      expect(getPcExplore()).toContain('Firefox');
    });

    it('should detect Safari browser', () => {
      mockUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15'
      );
      const { getPcExplore } = loadPlatform();
      expect(getPcExplore()).toContain('Safari');
    });

    it('should detect Edge browser', () => {
      mockUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59'
      );
      const { getPcExplore } = loadPlatform();
      expect(getPcExplore()).toContain('Chrome');
    });

    it('should detect IE browser', () => {
      mockUserAgent('Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko');
      const { getPcExplore } = loadPlatform();
      expect(getPcExplore()).toContain('IE');
    });
  });

  describe('getSystemOS', () => {
    it('should detect Windows OS', () => {
      mockUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      );
      const { getSystemOS } = loadPlatform();
      expect(getSystemOS()).toBe('windows');
    });

    it('should detect macOS', () => {
      mockUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15'
      );
      const { getSystemOS } = loadPlatform();
      expect(getSystemOS()).toBe('mac');
    });

    it('should detect iOS', () => {
      mockUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
      );
      const { getSystemOS } = loadPlatform();
      expect(getSystemOS()).toBe('ios');
    });

    it('should detect Android', () => {
      mockUserAgent(
        'Mozilla/5.0 (Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'
      );
      const { getSystemOS } = loadPlatform();
      expect(getSystemOS()).toBe('android');
    });

    it('should detect Linux', () => {
      mockUserAgent(
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
      );
      const { getSystemOS } = loadPlatform();
      expect(getSystemOS()).toBe('linux');
    });

    it('should detect HarmonyOS', () => {
      mockUserAgent(
        'Mozilla/5.0 (HarmonyOS; HMSCore 6.2.0.312; GMSCore 21.21.16) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.93 HuaweiBrowser/11.1.5.301 Mobile Safari/537.36'
      );
      const { getSystemOS } = loadPlatform();
      expect(getSystemOS()).toBe('harmony');
    });
  });

  describe('getMobilePlatform', () => {
    it('should detect iPhone', () => {
      mockUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
      );
      const { getMobilePlatform } = loadPlatform();
      expect(getMobilePlatform()).toBe('iphone');
    });

    it('should detect iPad as iPhone', () => {
      mockUserAgent(
        'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
      );
      const { getMobilePlatform } = loadPlatform();
      expect(getMobilePlatform()).toBe('iphone');
    });

    it('should detect Android as gphone', () => {
      mockUserAgent(
        'Mozilla/5.0 (Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'
      );
      const { getMobilePlatform } = loadPlatform();
      expect(getMobilePlatform()).toBe('gphone');
    });
  });

  describe('getMobileOS', () => {
    it('should detect iOS version', () => {
      mockUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
      );
      const { getMobileOS } = loadPlatform();
      const os = getMobileOS();
      expect(os.ios).toBeGreaterThan(0);
      expect(os.android).toBe(0);
    });

    it('should detect Android version', () => {
      mockUserAgent(
        'Mozilla/5.0 (Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'
      );
      const { getMobileOS } = loadPlatform();
      const os = getMobileOS();
      expect(os.android).toBeGreaterThan(0);
      expect(os.ios).toBe(0);
    });

    it('should handle unusual user agents gracefully', () => {
      mockUserAgent('Mozilla/5.0 (Unknown; OS Unknown) Unknown/Unknown');
      const { getMobileOS } = loadPlatform();
      const os = getMobileOS();
      expect(os.android).toBe(0);
      expect(os.ios).toBe(0);
    });
  });

  describe('getMobileBrandIdentify', () => {
    it('should detect iPhone', () => {
      mockUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
      );
      const { getMobileBrandIdentify } = loadPlatform();
      expect(getMobileBrandIdentify()).toBe('iphone');
    });

    it('should detect Huawei', () => {
      mockUserAgent(
        'Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36 HuaweiBrowser/11.1.5.301'
      );
      const { getMobileBrandIdentify } = loadPlatform();
      expect(getMobileBrandIdentify()).toBe('huawei');
    });

    it('should detect Xiaomi', () => {
      mockUserAgent(
        'Mozilla/5.0 (Linux; Android 11; Mi 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'
      );
      const { getMobileBrandIdentify } = loadPlatform();
      expect(getMobileBrandIdentify()).toBe('xiaomi');
    });

    it('should detect Samsung', () => {
      mockUserAgent(
        'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'
      );
      const { getMobileBrandIdentify } = loadPlatform();
      expect(getMobileBrandIdentify()).toBe('samsung');
    });

    it('should return unknown for unrecognized brands', () => {
      mockUserAgent(
        'Mozilla/5.0 (Linux; Android 11; UNKNOWN-BRAND) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'
      );
      const { getMobileBrandIdentify } = loadPlatform();
      expect(getMobileBrandIdentify()).toBe('unknown');
    });
  });
});
