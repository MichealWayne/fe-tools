"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setEnvContext = exports.setAnimationHooks = exports.mixins = void 0;
var utils_1 = require("utils");
var env_1 = require("./env");
var doms_1 = require("./doms");
var base_1 = require("./base");
var animate_1 = require("./animate");
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
function mixins() {
    var list = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        list[_i] = arguments[_i];
    }
    return function (target) {
        list.forEach(function (mixin) {
            Object.assign(target.prototype, mixin);
        });
    };
}
exports.mixins = mixins;
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
function setAnimationHooks(chartFactory) {
    chartFactory.prototype.setAnimation = function (onProcess) {
        var _a = this.chartjs.opts, duration = _a.duration, onFinish = _a.onFinish;
        (0, animate_1.animate)({
            duration: duration,
            onProcess: onProcess,
            onAnimationFinish: onFinish,
        });
    };
}
exports.setAnimationHooks = setAnimationHooks;
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
function setEnvContext(chart, _, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var instance = this;
        if (!instance) {
            (0, base_1.throwError)('no chart object to set context', 'setEnvContext');
        }
        if (!instance.canvas || !instance.ctx) {
            var opts_1 = instance.opts || {};
            var _canvas = void 0;
            var _defaultWidth = opts_1.width || 500;
            var _defaultHeight = opts_1.height || 500;
            if (env_1.isWeb) {
                var $el = instance.$el;
                if (!$el) {
                    (0, base_1.throwError)('no chart object to set context', 'setEnvContext');
                }
                $el.style.webkitUserSelect = 'none';
                $el.style.userSelect = 'none';
                if ((0, utils_1.isFunction)($el.getContext)) {
                    _canvas = $el;
                }
                else {
                    _canvas = (0, doms_1.createCanvasElem)($el, {
                        id: opts_1.id,
                        width: opts_1.width,
                        height: opts_1.height,
                    });
                }
            }
            else if (env_1.isWeapp) {
                var _wx_1 = typeof wx === 'undefined' ? null : wx;
                if (!_wx_1 || !(0, utils_1.isFunction)(_wx_1.createCanvasContext)) {
                    (0, base_1.throwError)('no param {Object} Ctx', 'setEnvContext');
                }
                var Ctx_1 = _wx_1.createCanvasContext(opts_1.id);
                _canvas = {
                    info: 'Weapp native canvas',
                    width: _defaultWidth,
                    height: _defaultHeight,
                    getContext: function () {
                        return Ctx_1;
                    },
                    draw: function (bool) {
                        var _a, _b, _c;
                        if (bool) {
                            return Ctx_1.draw(true);
                        }
                        (_a = _wx_1.drawCanvas) === null || _a === void 0 ? void 0 : _a.call(_wx_1, {
                            canvasId: opts_1.id,
                            actions: (_c = (_b = instance.ctx) === null || _b === void 0 ? void 0 : _b.getActions) === null || _c === void 0 ? void 0 : _c.call(_b),
                        });
                    },
                };
            }
            else {
                var Canvas = opts_1.Canvas;
                if (!Canvas) {
                    (0, base_1.throwError)('no param {Object} Canvas', 'setEnvContext');
                }
                _canvas = Canvas.createCanvas(_defaultWidth, _defaultHeight);
                if (opts_1.handleOut) {
                    opts_1.handleOut(_canvas);
                }
            }
            instance.canvas = _canvas;
            instance.ctx = _canvas.getContext('2d');
            instance._chart = {
                width: _canvas.width,
                height: _canvas.height,
            };
        }
        return originalMethod.apply(instance, args);
    };
    return descriptor;
}
exports.setEnvContext = setEnvContext;
