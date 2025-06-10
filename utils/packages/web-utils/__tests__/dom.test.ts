/**
 * @author Wayne
 * @Date 2025-06-08 10:35:00
 * @LastEditTime 2025-06-08 19:18:32
 */
import {
  insertAfter,
  insertBefore,
  hide,
  getOffsetPos,
  getScrollTop,
  setScrollTop,
  getScrollPosition,
  animateScrollTo,
  smoothScroll,
  disableCopy,
} from '../src/dom';

describe('DOM Utils', () => {
  // 设置DOM测试环境
  beforeEach(() => {
    // 重置document.body
    document.body.innerHTML = '';
  });

  describe('insertAfter', () => {
    it('应该在指定元素后插入HTML', () => {
      // 创建测试元素
      const parent = document.createElement('div');
      document.body.appendChild(parent);

      // 执行插入操作
      insertAfter(parent, '<span>inserted after</span>');

      // 验证插入结果
      expect(document.body.innerHTML).toContain('<div></div><span>inserted after</span>');
    });
  });

  describe('insertBefore', () => {
    it('应该在指定元素前插入HTML', () => {
      // 创建测试元素
      const parent = document.createElement('div');
      document.body.appendChild(parent);

      // 执行插入操作
      insertBefore(parent, '<span>inserted before</span>');

      // 验证插入结果
      expect(document.body.innerHTML).toContain('<span>inserted before</span><div></div>');
    });
  });

  describe('hide', () => {
    it('应该隐藏指定的元素', () => {
      // 创建测试元素
      const elem1 = document.createElement('div');
      const elem2 = document.createElement('span');
      document.body.appendChild(elem1);
      document.body.appendChild(elem2);

      // 执行隐藏操作
      hide(elem1, elem2);

      // 验证元素被隐藏
      expect(elem1.style.display).toBe('none');
      expect(elem2.style.display).toBe('none');
    });

    it('应该处理多个元素', () => {
      // 创建多个测试元素
      const elements = Array.from({ length: 5 }, () => {
        const elem = document.createElement('div');
        document.body.appendChild(elem);
        return elem;
      });

      // 执行隐藏操作
      hide(...elements);

      // 验证所有元素都被隐藏
      elements.forEach(elem => {
        expect(elem.style.display).toBe('none');
      });
    });
  });

  describe('getOffsetPos', () => {
    it('应该返回元素相对于文档的位置', () => {
      // 创建并模拟嵌套元素
      const parent = document.createElement('div');
      parent.style.position = 'relative';
      parent.style.top = '100px';
      parent.style.left = '50px';

      const child = document.createElement('div');
      child.style.position = 'relative';
      child.style.top = '20px';
      child.style.left = '30px';

      parent.appendChild(child);
      document.body.appendChild(parent);

      // 模拟offsetLeft、offsetTop和offsetParent
      Object.defineProperty(parent, 'offsetLeft', { value: 50, configurable: true });
      Object.defineProperty(parent, 'offsetTop', { value: 100, configurable: true });
      Object.defineProperty(parent, 'offsetParent', { value: null, configurable: true });

      Object.defineProperty(child, 'offsetLeft', { value: 30, configurable: true });
      Object.defineProperty(child, 'offsetTop', { value: 20, configurable: true });
      Object.defineProperty(child, 'offsetParent', { value: parent, configurable: true });

      // 获取位置
      const pos = getOffsetPos(child);

      // 验证位置计算正确
      expect(pos.left).toBe(80); // 50 + 30
      expect(pos.top).toBe(120); // 100 + 20
    });

    it('应该处理没有提供元素的情况', () => {
      const pos = getOffsetPos(undefined);
      expect(pos.left).toBe(0);
      expect(pos.top).toBe(0);
    });
  });

  describe('Scroll Functions', () => {
    // 保存原始scroll属性和方法
    let originalScrollTo: typeof window.scrollTo;
    let originalPageYOffset: number;
    let originalPageXOffset: number;

    beforeEach(() => {
      // 保存原始方法
      originalScrollTo = window.scrollTo;
      originalPageYOffset = window.pageYOffset;
      originalPageXOffset = window.pageXOffset;

      // 模拟scrollTo方法
      window.scrollTo = jest.fn();

      // 模拟pageYOffset和pageXOffset
      Object.defineProperty(window, 'pageYOffset', { value: 100, configurable: true });
      Object.defineProperty(window, 'pageXOffset', { value: 50, configurable: true });

      // 模拟document.body.scrollTop和document.documentElement.scrollTop
      Object.defineProperty(document.documentElement, 'scrollTop', {
        value: 100,
        configurable: true,
        writable: true,
      });
      Object.defineProperty(document.body, 'scrollTop', {
        value: 0,
        configurable: true,
        writable: true,
      });
    });

    afterEach(() => {
      // 恢复原始方法
      window.scrollTo = originalScrollTo;

      // 恢复原始pageYOffset和pageXOffset
      Object.defineProperty(window, 'pageYOffset', {
        value: originalPageYOffset,
        configurable: true,
      });
      Object.defineProperty(window, 'pageXOffset', {
        value: originalPageXOffset,
        configurable: true,
      });
    });

    describe('getScrollTop', () => {
      it('应该返回文档的滚动高度', () => {
        expect(getScrollTop()).toBe(100);
      });
    });

    describe('setScrollTop', () => {
      it('应该设置文档的滚动高度', () => {
        setScrollTop(200);
        expect(window.scrollTo).toHaveBeenCalledWith(0, 200);
      });

      it('应该返回设置的高度值', () => {
        const result = setScrollTop(200);
        expect(result).toBe(200);
      });
    });

    describe('getScrollPosition', () => {
      it('应该返回窗口的滚动位置', () => {
        const position = getScrollPosition();
        expect(position.x).toBe(50);
        expect(position.y).toBe(100);
      });

      it('应该支持自定义元素', () => {
        // 创建模拟元素
        const customElem = {
          pageXOffset: 30,
          pageYOffset: 40,
          screenLeft: 0,
          screenTop: 0,
        };

        const position = getScrollPosition(customElem as any);
        expect(position.x).toBe(30);
        expect(position.y).toBe(40);
      });
    });

    describe('animateScrollTo', () => {
      // 模拟requestAnimationFrame
      let originalRequestAnimationFrame: typeof window.requestAnimationFrame;

      beforeEach(() => {
        // 保存原始方法
        originalRequestAnimationFrame = window.requestAnimationFrame;

        // 模拟requestAnimationFrame立即执行回调
        window.requestAnimationFrame = (callback: FrameRequestCallback) => {
          callback(0);
          return 0;
        };
      });

      afterEach(() => {
        // 恢复原始方法
        window.requestAnimationFrame = originalRequestAnimationFrame;
      });

      it('应该立即滚动到目标位置，如果duration为负数', () => {
        animateScrollTo(200, -1);
        expect(window.scrollTo).toHaveBeenCalledWith(0, 200);
      });

      it('应该不执行滚动，如果当前位置等于目标位置', () => {
        // 重置模拟
        (window.scrollTo as jest.Mock).mockClear();

        animateScrollTo(100, 100); // 当前scrollTop为100
        expect(window.scrollTo).not.toHaveBeenCalled();
      });

      it('应该平滑滚动到目标位置', () => {
        // 模拟getScrollTop每次返回不同的值，模拟滚动过程
        let scrollTopValue = 0;
        jest
          .spyOn(document.documentElement, 'scrollTop', 'get')
          .mockImplementation(() => scrollTopValue);
        jest.spyOn(document.body, 'scrollTop', 'get').mockImplementation(() => 0);

        // 每次调用scrollTo时增加scrollTopValue的值
        (window.scrollTo as jest.Mock).mockImplementation((x, y) => {
          scrollTopValue = y;
        });

        animateScrollTo(100, 500); // 滚动到100px，持续500ms

        // 由于我们模拟了requestAnimationFrame立即执行，所以应该已经完成滚动
        expect(scrollTopValue).toBe(100);
      });
    });

    describe('smoothScroll', () => {
      it('应该调用元素的scrollIntoView方法', () => {
        // 创建测试元素
        const testElem = document.createElement('div');
        testElem.id = 'test-elem';
        document.body.appendChild(testElem);

        // 模拟scrollIntoView方法
        testElem.scrollIntoView = jest.fn();

        // 执行平滑滚动
        smoothScroll('#test-elem');

        // 验证调用了scrollIntoView方法
        expect(testElem.scrollIntoView).toHaveBeenCalledWith({
          behavior: 'smooth',
        });
      });

      it('应该安全处理元素不存在的情况', () => {
        // 不存在的选择器不会抛出错误
        expect(() => smoothScroll('#non-existent')).not.toThrow();
      });
    });
  });

  describe('disableCopy', () => {
    it('应该禁用复制和粘贴', () => {
      // 模拟document.querySelector
      const originalQuerySelector = document.querySelector;
      document.querySelector = jest.fn().mockReturnValue({
        oncopy: null,
        onpaste: null,
      });

      // 执行禁用复制
      disableCopy();

      // 获取模拟的HTML元素
      const htmlElem = (document.querySelector as jest.Mock).mock.results[0].value;

      // 验证设置了oncopy和onpaste事件处理函数
      expect(htmlElem.oncopy).toBeDefined();
      expect(htmlElem.onpaste).toBeDefined();

      // 验证事件处理函数返回false
      expect(htmlElem.oncopy()).toBe(false);
      expect(htmlElem.onpaste()).toBe(false);

      // 恢复原始方法
      document.querySelector = originalQuerySelector;
    });

    it('应该安全处理HTML元素不存在的情况', () => {
      // 模拟document.querySelector返回null
      const originalQuerySelector = document.querySelector;
      document.querySelector = jest.fn().mockReturnValue(null);

      // 不应该抛出错误
      expect(() => disableCopy()).not.toThrow();

      // 恢复原始方法
      document.querySelector = originalQuerySelector;
    });
  });
});
