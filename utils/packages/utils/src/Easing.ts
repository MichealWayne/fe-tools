/**
 * @fileoverview Animation easing functions for smooth transitions and animations.
 *
 * This module provides a collection of easing functions commonly used in animations
 * to create natural-looking motion. Each easing function maps a time value between
 * 0 and 1 to an interpolated value, controlling the acceleration and deceleration
 * of animated properties.
 *
 * @module Easing
 * @description 动画缓动函数。Animation easing functions
 * @author Wayne
 * @since 1.0.0
 */

/**
 * @typedef {Function} EasingFunction
 * @description 缓动函数类型。Easing function type
 * @param {number} amount - 时间进度，从0到1。Time progress from 0 to 1
 * @returns {number} 插值结果。Interpolated value
 */
export type EasingFunction = (amount: number) => number;

/**
 * The Ease class provides a collection of easing functions for use with tween.js.
 * 缓动函数集合，用于动画过渡效果。
 * @see https://www.febucci.com/2018/08/easing-functions/
 */
const Easing = {
  // 线性缓动函数
  Linear: {
    None: (amount: number) => amount,
  },
  // 二次缓动函数
  Quadratic: {
    // 缓慢加速
    In: (amount: number) => amount * amount,
    // 缓慢减速
    Out: (amount: number) => amount * (2 - amount),
    // 先加速后减速
    InOut: (amount: number) => {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount;
      }

      return -0.5 * (--amount * (amount - 2) - 1);
    },
  },
  // 三次缓动函数
  Cubic: {
    // 缓慢加速
    In: (amount: number) => amount * amount * amount,
    // 缓慢减速
    Out: (amount: number) => --amount * amount * amount + 1,
    // 先加速后减速
    InOut: (amount: number) => {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount;
      }
      return 0.5 * ((amount -= 2) * amount * amount + 2);
    },
  },
  // 四次缓动函数
  Quartic: {
    // 缓慢加速
    In: (amount: number) => amount * amount * amount * amount,
    // 缓慢减速
    Out: (amount: number) => 1 - --amount * amount * amount * amount,
    // 先加速后减速
    InOut: (amount: number) => {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount * amount;
      }

      return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
    },
  },
  // 五次缓动函数
  Quintic: {
    // 缓慢加速
    In: (amount: number) => amount * amount * amount * amount * amount,
    // 缓慢减速
    Out: (amount: number) => --amount * amount * amount * amount * amount + 1,
    // 先加速后减速
    InOut: (amount: number) => {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount * amount * amount;
      }

      return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
    },
  },
  // 正弦曲线缓动函数
  Sinusoidal: {
    // 从零开始加速，然后减速到最大值
    In: (amount: number) => 1 - Math.cos((amount * Math.PI) / 2),
    // 从最大值开始减速，然后加速到零
    Out: (amount: number) => Math.sin((amount * Math.PI) / 2),
    // 先加速后减速
    InOut: (amount: number) => 0.5 * (1 - Math.cos(Math.PI * amount)),
  },
  // 指数曲线缓动函数
  Exponential: {
    // 从零开始加速，然后指数增长到最大值
    In: (amount: number) => (amount === 0 ? 0 : Math.pow(1024, amount - 1)),
    // 从最大值开始指数衰减，然后减速到零
    Out: (amount: number) => (amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount)),
    // 先加速后减速
    InOut: (amount: number) => {
      if (amount === 0) {
        return 0;
      }

      if (amount === 1) {
        return 1;
      }

      if ((amount *= 2) < 1) {
        return 0.5 * Math.pow(1024, amount - 1);
      }

      return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
    },
  },
  Circular: {
    In: (amount: number) => 1 - Math.sqrt(1 - amount * amount),
    Out: (amount: number) => Math.sqrt(1 - --amount * amount),
    InOut: (amount: number) => {
      if ((amount *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
      }
      return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
    },
  },
  Elastic: {
    In: (amount: number) => {
      if (amount === 0) {
        return 0;
      }

      if (amount === 1) {
        return 1;
      }

      return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
    },
    Out: (amount: number) => {
      if (amount === 0) {
        return 0;
      }

      if (amount === 1) {
        return 1;
      }
      return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
    },
    InOut: (amount: number) => {
      if (amount === 0) {
        return 0;
      }

      if (amount === 1) {
        return 1;
      }

      amount *= 2;

      if (amount < 1) {
        return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
      }

      return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
    },
  },
  Back: {
    In: (amount: number) => {
      const s = 1.70158;
      return amount * amount * ((s + 1) * amount - s);
    },
    Out: (amount: number) => {
      const s = 1.70158;
      return --amount * amount * ((s + 1) * amount + s) + 1;
    },
    InOut: (amount: number) => {
      const s = 1.70158 * 1.525;
      if ((amount *= 2) < 1) {
        return 0.5 * (amount * amount * ((s + 1) * amount - s));
      }
      return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
    },
  },
  Bounce: {
    In: (amount: number) => {
      return 1 - Easing.Bounce.Out(1 - amount);
    },
    Out: (amount: number) => {
      if (amount < 1 / 2.75) {
        return 7.5625 * amount * amount;
      } else if (amount < 2 / 2.75) {
        return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
      } else if (amount < 2.5 / 2.75) {
        return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
      } else {
        return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
      }
    },
    InOut: (amount: number) => {
      if (amount < 0.5) {
        return Easing.Bounce.In(amount * 2) * 0.5;
      }
      return Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
    },
  },
};

export default Easing;
