/**
 * @util animations
 * @author Wayne
 * @createTime 2019-07-15
 * @lastModified 2022-04-17
 * @changeLog
 *  2022-04-17 remove (moz|webkit)RequestAnimationFrame
 */

import { DEFAULT_ANIMATION_TIME } from '../constants';
import { NOOP } from './base';

/**
 * @function timingFunction
 * @description easeInOut timing function.
 * @param {Number} pos
 * @return {Number}
 */
const timingFunction = (pos: number) => {
  const THRESHOLD_VAL = 0.5;
  const IS_LT_HALF = (pos /= THRESHOLD_VAL) < 1;
  if (IS_LT_HALF) {
    return THRESHOLD_VAL * Math.pow(pos, 3);
  }

  return THRESHOLD_VAL * (Math.pow(pos - 2, 3) + 2);
};

/**
 * @webApi requestAnimationFrame
 * @description requestAnimationFrame for low device
 * @compatibility mobile: ios6.1, android 4.4.3; PC: IE10, Chrome 22 (https://caniuse.com/?search=requestAnimationFrame)
 */

/**
 * @function createAnimationFrame
 * @private
 */
let createAnimationFrame = function () {
  // normal webview
  if (typeof requestAnimationFrame !== 'undefined') {
    createAnimationFrame = function () {
      return requestAnimationFrame;
    };
    return requestAnimationFrame;
  }

  // abnormal webview or nodejs
  return function (step: (num: number) => void, delay: number) {
    setTimeout(function () {
      step(+new Date());
    }, delay);
  };
};

interface AnimationOptions {
  // 动画时间
  duration: number;

  // 进行中回调，process范围0～1（含）
  onProcess?: (process: number) => void;

  // 动画结束回调
  onAnimationFinish?: () => void;
}

/**
 * @function animation
 * @param {AnimationOptions} opts 参数
 *        {Number} duration 动画时间
 *        {Function} onProcess 动画执行回调
 *        {Function} onAnimationFinish 动画完成回调
 */
export function animate(opts: AnimationOptions): void {
  const DELAY_TIME = 23;
  const duration = opts.duration || DEFAULT_ANIMATION_TIME;
  const onProcess = opts.onProcess || NOOP;
  const onAnimationFinish = opts.onAnimationFinish || NOOP;
  const animationFrame = createAnimationFrame();

  let startTimeStamp: number | null = null;

  function step(timeStamp: number) {
    if (timeStamp === null) {
      // end
      onProcess(1);
      onAnimationFinish();
      return false;
    }

    if (startTimeStamp === null) {
      startTimeStamp = timeStamp;
    }
    if (timeStamp - startTimeStamp < duration) {
      let process = (timeStamp - startTimeStamp) / duration;

      process = timingFunction(process);
      onProcess(process);
      animationFrame(step, DELAY_TIME);
    } else {
      onProcess(1);
      onAnimationFinish();
    }
    return true;
  }

  animationFrame(step, DELAY_TIME);
}
