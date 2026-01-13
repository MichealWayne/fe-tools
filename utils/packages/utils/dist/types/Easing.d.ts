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
declare const Easing: {
    Linear: {
        None: (amount: number) => number;
    };
    Quadratic: {
        In: (amount: number) => number;
        Out: (amount: number) => number;
        InOut: (amount: number) => number;
    };
    Cubic: {
        In: (amount: number) => number;
        Out: (amount: number) => number;
        InOut: (amount: number) => number;
    };
    Quartic: {
        In: (amount: number) => number;
        Out: (amount: number) => number;
        InOut: (amount: number) => number;
    };
    Quintic: {
        In: (amount: number) => number;
        Out: (amount: number) => number;
        InOut: (amount: number) => number;
    };
    Sinusoidal: {
        In: (amount: number) => number;
        Out: (amount: number) => number;
        InOut: (amount: number) => number;
    };
    Exponential: {
        In: (amount: number) => number;
        Out: (amount: number) => number;
        InOut: (amount: number) => number;
    };
    Circular: {
        In: (amount: number) => number;
        Out: (amount: number) => number;
        InOut: (amount: number) => number;
    };
    Elastic: {
        In: (amount: number) => number;
        Out: (amount: number) => number;
        InOut: (amount: number) => number;
    };
    Back: {
        In: (amount: number) => number;
        Out: (amount: number) => number;
        InOut: (amount: number) => number;
    };
    Bounce: {
        In: (amount: number) => number;
        Out: (amount: number) => number;
        InOut: (amount: number) => number;
    };
};
export default Easing;
