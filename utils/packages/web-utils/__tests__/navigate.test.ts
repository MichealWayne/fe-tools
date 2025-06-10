/**
 * @author Wayne
 * @Date 2025-06-08 17:35:17
 * @LastEditTime 2025-06-09 19:18:45
 */
import { navigateTo, httpsRedirect } from '../src/navigate';

describe('navigate module', () => {
  let originalWindowOpen: typeof window.open;
  let originalLocationAssign: typeof window.location.assign;
  let originalLocationReplace: typeof window.location.replace;
  let originalLocationHref: string;

  beforeEach(() => {
    // Save original methods
    originalWindowOpen = window.open;
    originalLocationAssign = window.location.assign;
    originalLocationReplace = window.location.replace;
    originalLocationHref = window.location.href;

    // Mock methods
    window.open = jest.fn();
    window.location.assign = jest.fn();
    window.location.replace = jest.fn();
  });

  afterEach(() => {
    // Restore original methods
    window.open = originalWindowOpen;
    window.location.assign = originalLocationAssign;
    window.location.replace = originalLocationReplace;
    Object.defineProperty(window.location, 'href', { value: originalLocationHref });
  });

  describe('navigateTo', () => {
    it('should use window.open with target when newTab=true', () => {
      navigateTo('https://example.com', { newTab: true });
      expect(window.open).toHaveBeenCalledWith('https://example.com', '_blank');

      navigateTo('https://example.com', { newTab: true, target: '_self' });
      expect(window.open).toHaveBeenCalledWith('https://example.com', '_self');
    });

    it('should use location.replace when replace=true', () => {
      navigateTo('https://example.com', { replace: true });
      expect(window.location.replace).toHaveBeenCalledWith('https://example.com');
      expect(window.open).not.toHaveBeenCalled();
      expect(window.location.assign).not.toHaveBeenCalled();
    });

    it('should use location.assign by default', () => {
      navigateTo('https://example.com');
      expect(window.location.assign).toHaveBeenCalledWith('https://example.com');
      expect(window.open).not.toHaveBeenCalled();
      expect(window.location.replace).not.toHaveBeenCalled();
    });

    it('should prioritize newTab over replace when both are true', () => {
      navigateTo('https://example.com', { newTab: true, replace: true });
      expect(window.open).toHaveBeenCalledWith('https://example.com', '_blank');
      expect(window.location.replace).not.toHaveBeenCalled();
      expect(window.location.assign).not.toHaveBeenCalled();
    });
  });

  describe('httpsRedirect', () => {
    it('should redirect HTTP to HTTPS', () => {
      Object.defineProperty(window.location, 'href', { value: 'http://example.com' });
      httpsRedirect();
      expect(window.location.replace).toHaveBeenCalled();
      const callArg = (window.location.replace as jest.Mock).mock.calls[0][0];
      expect(callArg).toContain('https://');
    });

    it('should redirect HTTP to HTTPS with specified URL', () => {
      httpsRedirect('http://example.org/path?query=value');
      expect(window.location.replace).toHaveBeenCalled();
      const callArg = (window.location.replace as jest.Mock).mock.calls[0][0];
      expect(callArg).toBe('https://example.org/path?query=value');
    });

    it('should not redirect if URL is already HTTPS', () => {
      Object.defineProperty(window.location, 'href', { value: 'https://example.com' });
      httpsRedirect();
      expect(window.location.replace).not.toHaveBeenCalled();

      httpsRedirect('https://example.org');
      expect(window.location.replace).not.toHaveBeenCalled();
    });
  });
});
