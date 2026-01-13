/**
 * @author Wayne
 * @Date 2025-06-08 17:17:56
 * @LastEditTime 2025-06-09 19:18:47
 */
import {
  getClientHeight,
  getClientWidth,
  isFullScreen,
  isFullScreenEnabled,
  enterFullscreen,
  exitFullscreen,
} from '../src/screen';

describe('screen', () => {
  // 保存原始文档属性
  let originalDocumentBody: any;
  let originalDocumentElement: any;
  let originalDocumentCompatMode: string;

  beforeEach(() => {
    // 保存原始值
    originalDocumentBody = { ...document.body };
    originalDocumentElement = { ...document.documentElement };
    originalDocumentCompatMode = document.compatMode;

    // 模拟clientHeight和clientWidth
    Object.defineProperty(document.body, 'clientHeight', { value: 768, configurable: true });
    Object.defineProperty(document.body, 'clientWidth', { value: 1366, configurable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 768,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, 'clientWidth', {
      value: 1366,
      configurable: true,
    });

    // 模拟document.compatMode
    Object.defineProperty(document, 'compatMode', { value: 'CSS1Compat', configurable: true });

    // 模拟全屏API
    Object.defineProperty(document, 'fullscreenElement', { value: null, configurable: true });
    Object.defineProperty(document, 'fullscreenEnabled', { value: true, configurable: true });

    // 模拟requestFullscreen方法
    document.body.requestFullscreen = jest.fn().mockResolvedValue(undefined);
    document.exitFullscreen = jest.fn().mockResolvedValue(undefined);
  });

  afterEach(() => {
    // 恢复原始值
    Object.defineProperty(document, 'body', { value: originalDocumentBody, configurable: true });
    Object.defineProperty(document, 'documentElement', {
      value: originalDocumentElement,
      configurable: true,
    });
    Object.defineProperty(document, 'compatMode', {
      value: originalDocumentCompatMode,
      configurable: true,
    });

    // 清除模拟
    jest.clearAllMocks();
  });

  describe('getClientHeight', () => {
    it('应该返回可视窗口的高度', () => {
      expect(getClientHeight()).toBe(768);
    });

    it('应该返回document.body和document.documentElement中较大的clientHeight', () => {
      // 设置不同的clientHeight
      Object.defineProperty(document.body, 'clientHeight', { value: 700, configurable: true });
      Object.defineProperty(document.documentElement, 'clientHeight', {
        value: 800,
        configurable: true,
      });

      expect(getClientHeight()).toBe(800);

      // 交换值
      Object.defineProperty(document.body, 'clientHeight', { value: 900, configurable: true });
      Object.defineProperty(document.documentElement, 'clientHeight', {
        value: 600,
        configurable: true,
      });

      expect(getClientHeight()).toBe(900);
    });
  });

  describe('getClientWidth', () => {
    it('应该返回可视窗口的宽度', () => {
      expect(getClientWidth()).toBe(1366);
    });

    it('当document.compatMode为CSS1Compat时应该返回document.documentElement.clientWidth', () => {
      // 设置document.compatMode为CSS1Compat
      Object.defineProperty(document, 'compatMode', { value: 'CSS1Compat', configurable: true });
      // 设置不同的clientWidth
      Object.defineProperty(document.body, 'clientWidth', { value: 1200, configurable: true });
      Object.defineProperty(document.documentElement, 'clientWidth', {
        value: 1300,
        configurable: true,
      });

      expect(getClientWidth()).toBe(1300);
    });

    it('当document.compatMode为BackCompat时应该返回document.body.clientWidth', () => {
      // 设置document.compatMode为BackCompat
      Object.defineProperty(document, 'compatMode', { value: 'BackCompat', configurable: true });
      // 设置不同的clientWidth
      Object.defineProperty(document.body, 'clientWidth', { value: 1200, configurable: true });
      Object.defineProperty(document.documentElement, 'clientWidth', {
        value: 1300,
        configurable: true,
      });

      expect(getClientWidth()).toBe(1200);
    });
  });

  describe('isFullScreen', () => {
    it('当没有全屏元素时应该返回false', () => {
      expect(isFullScreen()).toBeUndefined();
    });

    it('当有全屏元素时应该返回true', () => {
      // 模拟文档处于全屏状态
      Object.defineProperty(document, 'fullscreenElement', {
        value: document.body,
        configurable: true,
      });

      expect(isFullScreen()).toBe(document.body);
    });

    it('应该支持不同浏览器的全屏API', () => {
      // 测试webkit前缀
      Object.defineProperty(document, 'webkitFullScreenElement', {
        value: document.body,
        configurable: true,
      });
      expect(isFullScreen()).toBe(document.body);

      // 重置
      Object.defineProperty(document, 'webkitFullScreenElement', {
        value: null,
        configurable: true,
      });

      // 测试moz前缀
      Object.defineProperty(document, 'mozFullScreenElement', {
        value: document.body,
        configurable: true,
      });
      expect(isFullScreen()).toBe(document.body);

      // 重置
      Object.defineProperty(document, 'mozFullScreenElement', { value: null, configurable: true });

      // 测试ms前缀
      Object.defineProperty(document, 'msFullScreenElement', {
        value: document.body,
        configurable: true,
      });
      expect(isFullScreen()).toBe(document.body);
    });
  });

  describe('isFullScreenEnabled', () => {
    it('当浏览器支持全屏操作时应该返回true', () => {
      expect(isFullScreenEnabled()).toBeTruthy();
    });

    it('当浏览器不支持全屏操作时应该返回false', () => {
      // 模拟浏览器不支持全屏操作
      Object.defineProperty(document, 'fullscreenEnabled', { value: false, configurable: true });

      expect(isFullScreenEnabled()).toBeFalsy();
    });

    it('应该支持不同浏览器的全屏API', () => {
      // 重置标准API
      Object.defineProperty(document, 'fullscreenEnabled', { value: false, configurable: true });

      // 测试webkit前缀
      Object.defineProperty(document, 'webkitFullscreenEnabled', {
        value: true,
        configurable: true,
      });
      expect(isFullScreenEnabled()).toBeTruthy();

      // 重置
      Object.defineProperty(document, 'webkitFullscreenEnabled', {
        value: false,
        configurable: true,
      });

      // 测试moz前缀
      Object.defineProperty(document, 'mozFullScreenEnabled', { value: true, configurable: true });
      expect(isFullScreenEnabled()).toBeTruthy();

      // 重置
      Object.defineProperty(document, 'mozFullScreenEnabled', { value: false, configurable: true });

      // 测试ms前缀
      Object.defineProperty(document, 'msFullscreenEnabled', { value: true, configurable: true });
      expect(isFullScreenEnabled()).toBeTruthy();
    });
  });

  describe('enterFullscreen', () => {
    it('应该调用元素的requestFullscreen方法', () => {
      enterFullscreen();

      // 验证调用了document.body.requestFullscreen
      expect(document.body.requestFullscreen).toHaveBeenCalled();
    });

    it('应该支持传入自定义元素', () => {
      const customElement = document.createElement('div');
      customElement.requestFullscreen = jest.fn();

      enterFullscreen(customElement);

      // 验证调用了customElement.requestFullscreen
      expect(customElement.requestFullscreen).toHaveBeenCalled();
    });

    it('当全屏模式被禁用时应该拒绝Promise', async () => {
      // 模拟浏览器不支持全屏操作
      Object.defineProperty(document, 'fullscreenEnabled', { value: false, configurable: true });
      Object.defineProperty(document, 'webkitFullscreenEnabled', {
        value: false,
        configurable: true,
      });
      Object.defineProperty(document, 'mozFullScreenEnabled', { value: false, configurable: true });
      Object.defineProperty(document, 'msFullscreenEnabled', { value: false, configurable: true });

      await expect(enterFullscreen()).rejects.toThrow('全屏模式被禁用');
    });

    it('应该支持不同浏览器的全屏API', () => {
      // 创建测试元素并模拟不同浏览器的全屏API
      const testElement = document.createElement('div');

      // 保存原始方法
      const originalRequestFullscreen = testElement.requestFullscreen;

      // 删除标准API（使用类型断言避免TypeScript错误）
      (testElement as any).requestFullscreen = undefined;

      // 测试webkit前缀
      (testElement as any).webkitRequestFullscreen = jest.fn();
      (testElement as any).webkitRequestFullScreen = jest.fn();
      enterFullscreen(testElement);
      expect((testElement as any).webkitRequestFullScreen).toHaveBeenCalled();

      // 重置
      (testElement as any).webkitRequestFullscreen = undefined;
      (testElement as any).webkitRequestFullScreen = undefined;

      // 测试moz前缀
      (testElement as any).mozRequestFullScreen = jest.fn();
      enterFullscreen(testElement);
      expect((testElement as any).mozRequestFullScreen).toHaveBeenCalled();

      // 重置
      (testElement as any).mozRequestFullScreen = undefined;

      // 测试ms前缀
      (testElement as any).msRequestFullscreen = jest.fn();
      enterFullscreen(testElement);
      expect((testElement as any).msRequestFullscreen).toHaveBeenCalled();

      // 恢复原始方法
      (testElement as any).requestFullscreen = originalRequestFullscreen;
    });

    it('当浏览器不支持任何全屏API时应该拒绝Promise', async () => {
      // 创建测试元素并删除所有全屏API
      const testElement = document.createElement('div');

      // 删除所有全屏API（使用类型断言避免TypeScript错误）
      (testElement as any).requestFullscreen = undefined;
      (testElement as any).webkitRequestFullscreen = undefined;
      (testElement as any).webkitRequestFullScreen = undefined;
      (testElement as any).mozRequestFullScreen = undefined;
      (testElement as any).msRequestFullscreen = undefined;

      await expect(enterFullscreen(testElement)).rejects.toThrow('浏览器不支持全屏操作');
    });
  });

  describe('exitFullscreen', () => {
    it('应该调用document.exitFullscreen方法', () => {
      exitFullscreen();

      // 验证调用了document.exitFullscreen
      expect(document.exitFullscreen).toHaveBeenCalled();
    });

    it('应该支持不同浏览器的全屏API', () => {
      // 保存原始方法
      const originalExitFullscreen = document.exitFullscreen;

      // 删除标准API（使用类型断言避免TypeScript错误）
      (document as any).exitFullscreen = undefined;

      // 测试webkit前缀
      (document as any).webkitExitFullscreen = jest.fn();
      exitFullscreen();
      expect((document as any).webkitExitFullscreen).toHaveBeenCalled();

      // 重置
      (document as any).webkitExitFullscreen = undefined;

      // 测试moz前缀
      (document as any).mozCancelFullScreen = jest.fn();
      exitFullscreen();
      expect((document as any).mozCancelFullScreen).toHaveBeenCalled();

      // 重置
      (document as any).mozCancelFullScreen = undefined;

      // 测试ms前缀
      (document as any).msExitFullscreen = jest.fn();
      exitFullscreen();
      expect((document as any).msExitFullscreen).toHaveBeenCalled();

      // 恢复原始方法
      (document as any).exitFullscreen = originalExitFullscreen;
    });
  });
});
