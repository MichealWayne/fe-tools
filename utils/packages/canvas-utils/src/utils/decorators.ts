/* eslint-disable @typescript-eslint/ban-types */
/**
 * @fileoverview TypeScript decorators for canvas chart classes, providing cross-platform context setup, animation hooks, and mixin functionality.
 *
 * This module provides decorators that enhance canvas chart classes with additional functionality
 * including environment-specific context setup (web, WeChat mini-program, Node.js), animation capabilities,
 * and mixin pattern support for code reuse across different chart types.
 *
 * @module Decorators
 * @author Wayne
 * @since 1.0.0
 */

import { isFunction } from 'utils';

import { isWeb, isWeapp } from './env';
import { createCanvasElem } from './doms';
import { throwError } from './base';
import { animate } from './animate';

/**
 * @function mixins
 * @description 实现混入模式的类装饰器。A class decorator that implements the mixin pattern by copying properties and methods from multiple source objects to the target class prototype. Enables multiple inheritance-like behavior in TypeScript classes.
 * @param {...any[]} list - 要混入到目标类的对象/类的可变数量参数。Variable number of objects/classes to mix into the target class
 * @returns {Function} 应用混入的类装饰器函数。Class decorator function that applies the mixins
 * @example
 * // Define mixin objects
 * const DrawingMixin = {
 *   drawLine(x1, y1, x2, y2) {
 *     this.ctx.beginPath();
 *     this.ctx.moveTo(x1, y1);
 *     this.ctx.lineTo(x2, y2);
 *     this.ctx.stroke();
 *   }
 * };
 *
 * const ColorMixin = {
 *   setColor(color) {
 *     this.ctx.fillStyle = color;
 *     this.ctx.strokeStyle = color;
 *   }
 * };
 *
 * // Apply mixins to class
 * @mixins(DrawingMixin, ColorMixin)
 * class MyChart {
 *   constructor(canvas) {
 *     this.ctx = canvas.getContext('2d');
 *   }
 *
 *   render() {
 *     this.setColor('#ff0000');  // From ColorMixin
 *     this.drawLine(0, 0, 100, 100);  // From DrawingMixin
 *   }
 * }
 *
 * @example
 * // Multiple chart types sharing common functionality
 * const AnimationMixin = {
 *   startAnimation(duration = 1000) {
 *     // Animation logic
 *   },
 *
 *   stopAnimation() {
 *     // Stop animation logic
 *   }
 * };
 *
 * const EventMixin = {
 *   addEventListener(event, handler) {
 *     this.canvas.addEventListener(event, handler);
 *   }
 * };
 *
 * @mixins(AnimationMixin, EventMixin)
 * class BarChart {
 *   // Bar chart specific implementation
 * }
 *
 * @mixins(AnimationMixin, EventMixin)
 * class LineChart {
 *   // Line chart specific implementation
 * }
 *
 * @since 1.0.0
 */
export function mixins(...list: any[]) {
  return function (target: any) {
    list.forEach(mixin => {
      Object.assign(target.prototype, mixin);
    });
  };
}

/**
 * @function setAnimationHooks
 * @description 为图表工厂类添加动画功能。Adds animation capabilities to chart factory classes by injecting a setAnimation method. The method uses the built-in animate function with configuration from the chart's options.
 * @param {Function} chartFactory - 要增强动画功能的图表类构造函数。The chart class constructor to enhance with animation capabilities
 * @returns {void} 此函数直接修改类原型。This function modifies the class prototype directly
 * @example
 * // Define a chart class
 * class PieChart {
 *   constructor(options) {
 *     this.chartjs = {
 *       opts: {
 *         duration: 1500,
 *         onFinish: () => console.log('Animation complete')
 *       }
 *     };
 *   }
 *
 *   render() {
 *     // Chart rendering logic
 *   }
 * }
 *
 * // Add animation hooks
 * setAnimationHooks(PieChart);
 *
 * // Now the chart has animation capabilities
 * const chart = new PieChart({
 *   duration: 2000,
 *   onFinish: () => console.log('Pie chart animated!')
 * });
 *
 * // Use the injected animation method
 * chart.setAnimation((progress) => {
 *   // Update chart based on animation progress (0 to 1)
 *   chart.animationProgress = progress;
 *   chart.render();
 * });
 *
 * @example
 * // Multiple chart types with consistent animation
 * class BarChart {
 *   constructor(options) {
 *     this.chartjs = { opts: options };
 *   }
 * }
 *
 * class LineChart {
 *   constructor(options) {
 *     this.chartjs = { opts: options };
 *   }
 * }
 *
 * // Add animation to both chart types
 * setAnimationHooks(BarChart);
 * setAnimationHooks(LineChart);
 *
 * // Both charts now have the same animation interface
 * const barChart = new BarChart({ duration: 1000 });
 * const lineChart = new LineChart({ duration: 1500 });
 *
 * @since 1.0.0
 * @see {@link animate} - The underlying animation function used
 */
export function setAnimationHooks(chartFactory: Function): void {
  chartFactory.prototype.setAnimation = function (onProcess: (rate: number) => void) {
    const { duration, onFinish } = this.chartjs.opts;

    animate({
      duration,
      onProcess,
      onAnimationFinish: onFinish,
    });
  };
}

/**
 * @function setEnvContext
 * @description 根据运行时环境自动设置适当的画布上下文的方法装饰器。A method decorator that automatically sets up the appropriate canvas context based on the runtime environment (web browser, WeChat mini-program, or Node.js). Handles canvas creation, sizing, and context initialization.
 * @param {any} chart - 被装饰的图表实例。The chart instance being decorated
 * @param {string} _ - 方法名（未使用的参数）。The method name (unused parameter)
 * @param {PropertyDescriptor} descriptor - 方法描述符。The method descriptor
 * @returns {PropertyDescriptor} 修改后的方法描述符。The modified method descriptor
 * @throws {Error} 如果缺少所需的环境特定依赖项则抛出错误。Throws error if required environment-specific dependencies are missing
 * @example
 * // Web browser usage
 * class WebChart {
 *   constructor(element, options) {
 *     this.$el = element; // DOM element
 *     this.opts = options;
 *   }
 *
 *   @setEnvContext
 *   initialize() {
 *     // After decoration, this.canvas and this.ctx are available
 *     console.log(this.canvas); // HTMLCanvasElement
 *     console.log(this.ctx);    // CanvasRenderingContext2D
 *   }
 * }
 *
 * const chart = new WebChart(document.getElementById('chart'), {
 *   width: 400,
 *   height: 300
 * });
 * chart.initialize();
 *
 * @example
 * // WeChat mini-program usage
 * class WeappChart {
 *   constructor(options) {
 *     this.opts = {
 *       id: 'myCanvas', // Canvas component ID
 *       width: 400,
 *       height: 300,
 *       ...options
 *     };
 *   }
 *
 *   @setEnvContext
 *   setup() {
 *     // Canvas context is automatically created for WeChat environment
 *     this.ctx.fillStyle = '#ff0000';
 *     this.ctx.fillRect(0, 0, 100, 100);
 *     this.canvas.draw(); // WeChat-specific draw method
 *   }
 * }
 *
 * @example
 * // Node.js usage with node-canvas
 * const { createCanvas } = require('canvas');
 *
 * class NodeChart {
 *   constructor(options) {
 *     this.opts = {
 *       Canvas: { createCanvas }, // Provide Canvas implementation
 *       width: 500,
 *       height: 400,
 *       handleOut: (canvas) => {
 *         // Save canvas to file or stream
 *         const fs = require('fs');
 *         const buffer = canvas.toBuffer('image/png');
 *         fs.writeFileSync('chart.png', buffer);
 *       },
 *       ...options
 *     };
 *   }
 *
 *   @setEnvContext
 *   generate() {
 *     // Canvas and context are ready for server-side rendering
 *     this.ctx.fillStyle = '#0066cc';
 *     this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
 *   }
 * }
 *
 * @since 1.0.0
 * @see {@link createCanvasElem} - For web canvas element creation
 */
export function setEnvContext(
  chart: any,
  _: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  if (!chart || isWeb ? !chart.$el : !chart.opts.Canvas && !isWeapp) {
    throwError('no chart object to set context', 'setEnvContext');
  }

  const { opts } = chart;
  let _canvas;

  const _defaultWidth = opts.width || 500;
  const _defaultHeight = opts.height || 500;

  if (isWeb) {
    // browser
    const { $el } = chart;
    $el.style.webkitUserSelect = 'none';
    $el.style.userSelect = 'none';

    if (isFunction($el.getContext)) {
      // $el为canvas
      _canvas = $el;
    } else {
      // 需要创建canvas
      _canvas = createCanvasElem($el, opts);
    }
  } else if (isWeapp) {
    // weapp
    // virtual canvas
    const _wx = typeof wx === 'undefined' ? null : wx;
    if (!_wx || !isFunction(_wx.createCanvasContext)) {
      throwError('no param {Object} Ctx', 'setEnvContext');
    }

    const Ctx = _wx.createCanvasContext(opts.id);

    _canvas = {
      info: 'Weapp native canvas',
      width: _defaultWidth,
      height: _defaultHeight,
      getContext() {
        return Ctx;
      },
      draw(bool: boolean) {
        if (bool) {
          return Ctx.draw(true);
        }
        _wx.drawCanvas({
          canvasId: opts.id,
          actions: chart.ctx.getActions(),
        });
      },
    };
  } else {
    // nodejs
    const { Canvas } = opts;

    if (!opts.Canvas) {
      throwError('no param {Object} Canvas', 'setEnvContext');
    }
    _canvas = Canvas.createCanvas(_defaultWidth, _defaultHeight);

    if (opts.handleOut) {
      opts.handleOut(_canvas);
    }
  }

  chart.canvas = _canvas;
  chart.ctx = _canvas.getContext('2d');
  chart._chart = {
    width: _canvas.width,
    height: _canvas.height,
  };

  return descriptor;
}
