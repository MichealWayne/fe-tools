/**
 * @model rem
 * @desc 单位1rem = 75px(mobile)；1rem = 54px(pc)。（当window.norem存在时，则不设置rem单位）
 * @alias window.flexible
 * @property {Number} dpr 设备屏幕分辨率
 * @property {Number} rem rem比例
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2023-02-21 11:12:35
 */

import { PlainObject } from 'utils';
import { isPC } from './platform';

const remRate = 1;

declare global {
  interface Window {
    norem?: boolean;
    flexible: any;
  }
}

(function (win) {
  // no rem set
  if (window.norem) return false;

  const doc = win.document;
  const docEl = doc.documentElement;
  const dpr = 1;
  let tid: number;

  const flexible: PlainObject = {};

  if (isPC()) {
    docEl.style.fontSize = '54px';
    return false;
  }

  /**
   * @function refreshRem
   * @description 重新根据屏幕调整rem单位。Re-adjusts rem units based on screen size
   * @example
   * window.flexible.refreshRem();
   */
  function refreshRem() {
    let { width } = docEl.getBoundingClientRect();
    width = width > 540 ? 540 : width;

    const rem = (width / 10) * remRate;
    docEl.style.fontSize = `${rem}px`;
    flexible.rem = rem;
    flexible.oriRem = width / 10;
  }

  win.addEventListener(
    'resize',
    function () {
      clearTimeout(tid);
      tid = win.setTimeout(refreshRem, 300);
    },
    false
  );
  win.addEventListener(
    'pageshow',
    function (e) {
      if (e.persisted) {
        clearTimeout(tid);
        tid = win.setTimeout(refreshRem, 300);
      }
    },
    false
  );

  if (doc.readyState === 'complete') {
    refreshRem();
  } else {
    doc.addEventListener(
      'DOMContentLoaded',
      function () {
        refreshRem();
      },
      false
    );
  }

  refreshRem();

  flexible.dpr = dpr;
  flexible.refreshRem = refreshRem;

  /**
   * @function rem2px
   * @description **window.flexible.rem2px(d)**。rem单位转px
   * @param  {Number | String} remVal rem值
   * @return {String}   转换后px值
   * @example
   * window.flexible.rem2px('1rem');  // '75px'
   */
  flexible.rem2px = (remVal: string | number) => {
    let val: string | number = parseFloat(remVal as string) * (Number(flexible.rem) || 0);
    if (typeof remVal === 'string' && remVal.match(/rem$/)) {
      val = `${val}px`;
    }
    return val;
  };

  /**
   * @function px2rem
   * @description **window.flexible.px2rem(d)**。rem单位转px
   * @param  {Number | String} pxVal px值
   * @return {String}   转换后rem值
   * @example
   * window.flexible.rem2px('75px');  // '1rem'
   */
  flexible.px2rem = (pxVal: string) => {
    let val: string | number = parseFloat(pxVal) / (Number(flexible.rem) || 0);
    if (typeof pxVal === 'string' && pxVal.match(/px$/)) {
      val = `${val}rem`;
    }
    return val;
  };

  win.flexible = flexible;
})(window);
