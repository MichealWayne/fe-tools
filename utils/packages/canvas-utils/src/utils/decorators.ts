/* eslint-disable @typescript-eslint/ban-types */
/**
 * @module canvasDecorators
 * @author Wayne
 * @Date 2022-02-08 14:53:40
 * @LastEditTime 2024-02-18 13:25:09
 */

import { isFunction } from 'utils';

import { isWeb, isWeapp } from './env';
import { createCanvasElem } from './doms';
import { throwError } from './base';
import { animate } from './animate';

/**
 * @decorator mixins
 * @param list
 * @returns
 */
export function mixins(...list: any[]) {
  return function (target: any) {
    Object.assign(target.prototype, ...list);
  };
}

/**
 * @decorator setAnimationHooks
 * @param chartFactory
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
 * @decorator setEnvContext
 * @param chart
 * @returns
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
