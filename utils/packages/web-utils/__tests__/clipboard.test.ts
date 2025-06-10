/**
 * @author Wayne
 * @Date 2025-06-08 17:21:25
 * @LastEditTime 2025-06-09 19:18:36
 */
import { copyToClipboard, readClipboardText } from '../src/clipboard';

describe('clipboard', () => {
  // 保存原始方法
  const originalExecCommand = document.execCommand;
  const originalClipboard = navigator.clipboard;

  beforeEach(() => {
    // 模拟document.execCommand
    document.execCommand = jest.fn().mockReturnValue(true);

    // 模拟clipboard API
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        readText: jest.fn().mockResolvedValue('剪贴板文本'),
        writeText: jest.fn().mockResolvedValue(undefined),
      },
      configurable: true,
    });

    // 模拟document.createElement和相关DOM操作
    const mockInput = {
      value: '',
      select: jest.fn(),
      remove: jest.fn(),
    };

    document.createElement = jest.fn().mockReturnValue(mockInput);
    document.body.appendChild = jest.fn();
  });

  afterEach(() => {
    // 恢复原始方法
    document.execCommand = originalExecCommand;
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      configurable: true,
    });

    jest.clearAllMocks();
  });

  describe('copyToClipboard', () => {
    it('应该使用document.execCommand复制文本到剪贴板', async () => {
      const result = await copyToClipboard('test');

      // 验证创建了input元素
      expect(document.createElement).toHaveBeenCalledWith('input');
      // 验证将input添加到DOM
      expect(document.body.appendChild).toHaveBeenCalled();
      // 验证调用了select方法
      expect(document.createElement('input').select).toHaveBeenCalled();
      // 验证调用了execCommand方法
      expect(document.execCommand).toHaveBeenCalledWith('copy');
      // 验证移除了input元素
      expect(document.createElement('input').remove).toHaveBeenCalled();
      // 验证返回true
      expect(result).toBe(true);
    });

    it('当document.execCommand失败时应该使用clipboard API', async () => {
      // 模拟document.execCommand失败
      document.execCommand = jest.fn().mockImplementation(() => {
        throw new Error('execCommand failed');
      });

      const result = await copyToClipboard('test');

      // 验证尝试使用clipboard API
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test');
      // 由于我们模拟了成功的clipboard API，应该返回true
      expect(result).toBe(true);
    });

    it('当所有复制方法都失败时应该返回false', async () => {
      // 模拟document.execCommand失败
      document.execCommand = jest.fn().mockImplementation(() => {
        throw new Error('execCommand failed');
      });

      // 模拟clipboard API也失败
      Object.defineProperty(navigator, 'clipboard', {
        value: {
          writeText: jest.fn().mockRejectedValue(new Error('clipboard API failed')),
        },
        configurable: true,
      });

      const result = await copyToClipboard('test');

      // 验证返回false
      expect(result).toBe(false);
    });
  });

  describe('readClipboardText', () => {
    it('应该从剪贴板读取文本', async () => {
      const text = await readClipboardText();

      // 验证调用了clipboard API
      expect(navigator.clipboard.readText).toHaveBeenCalled();
      // 验证返回了预期的文本
      expect(text).toBe('剪贴板文本');
    });

    it('当clipboard API失败时应该捕获错误', async () => {
      // 模拟clipboard API失败
      Object.defineProperty(navigator, 'clipboard', {
        value: {
          readText: jest.fn().mockRejectedValue(new Error('Failed to read clipboard')),
        },
        configurable: true,
      });

      // 应该捕获并拒绝Promise
      await expect(readClipboardText()).rejects.toThrow('Failed to read clipboard');
    });

    it('当clipboard API不可用时应该捕获错误', async () => {
      // 模拟clipboard API不可用
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        configurable: true,
      });

      // 应该捕获并拒绝Promise
      await expect(readClipboardText()).rejects.toThrow();
    });
  });
});
